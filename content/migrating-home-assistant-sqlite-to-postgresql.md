---
title: Migrate Home Assistant from SQLite to PostgreSQL
description: For a while I had been using the standard SQLite database for Home Assistant. However after adding more integrations it became very slow. I couldn't find an online guide to migrate from SQLite to an external PostgreSQL server. So I decided to write one for you my potential reader :))
published_at: 2022-01-10T00:00:00+00:00
author: Sigfried
---

I expect you already have a PostgreSQL database running somewhere. If you do not have this, or do not have a separate server for your Postgres, you can take a look at this [github.com/expaso/hassos-addon-timescaledb](https://github.com/expaso/hassos-addon-timescaledb) addon which installs a PostgreSQL server with TimescaleDB for you.

### Step 1: Retrieve the SQLite database

The first thing you will need to do is to retrieve the SQLite database. This is the `home-assistant_v2.db` file.

As pointed out to a comment below, you can actually disable the recorder and then retrieve the database. This should also ensure consistency and is easier than my options. You can call the service `recorder.disable` which will stop saving any events and states to the database. You can then retrieve the database and then re-enable the recorder. More information is at [Home Assistant Recorder](https://www.home-assistant.io/integrations/recorder/#service-disable) under the *Services*.

I will leave the options below in case that does not work for you.

For consistency I wanted to make sure that I did not have Home Assistant running while I was retrieving the database. So I stopped Home Assistant and retrieved the database. However since you need to have Core running to use SMB or SSH it isn't really straightforward. There are multiple ways to do this:

- Get the whole disk content of the OS. If you are using a Raspberry Pi this is probably the easiest and fastest way, just insert the SD into your computer. If you are using a VM, create a backup of the disk and then retrieve the disk content.
- Do this step after Step 2 & 3. What I mean is, you first setup the database and configure Home Assistant to use the database. This will only remove the events and history. Your users, config, etc. will not be changed since this isn't stored in the SQLite database. After that you can simply download the database file using SSH or SMB and thus ensure consistency.
- Install a tool on the OS itself, like `rsync` or `netcat`. This is will allow you to retrieve the database from the OS itself. I decided against this because I did not want to install other software on the OS.

I went for the first option, I downloaded a backup, extracted it and then retrieved the database file. I will make another post about this later.

Store the database somewhere temporary. I used `/tmp/home-assistant_v2.db` (on Linux).

### Step 2: Setup PostgreSQL

This is actually pretty straight forward if you already have a PostgreSQL server running. You can find instructions on [how to setup PostgreSQL on your OS here](https://www.postgresql.org/download/). Make sure you install a version that is supported by Home Assistant, you can find [a list of supported versions here](https://www.home-assistant.io/integrations/recorder).

Once you have a PostgreSQL server running, you can connect to it using the following command:
```bash
sudo -u postgres psql
```
Next up you will need to create a user.
```sql
CREATE USER homeassistant WITH PASSWORD 'yourpassword';
```
And now create a database. **Make sure the Database is in UTF-8 format!**
```sql
CREATE DATABASE homeassistant_db WITH OWNER homeassistant ENCODING 'utf8' TEMPLATE template0;
```
Once that is done, make sure Postgres allows connections from the Home Assistant server and your PC. This is done by adding the following to the `/etc/postgresql/VERSION/main/pg_hba.conf` file (obviously you will need to change the IP address):
```
host homeassistant_db     homeassistant   192.168.0.xxx/32      md5 # Home Assistant server
host homeassistant_db     homeassistant   192.168.0.xxx/32      md5 # Your PC
```

Now you will only need to reload PostgreSQL.
```
sudo systemctl reload postgresql
```

### Step 3: Let Home Assistant create the tables

Once you have created the empty database, you can let Home Assistant create the tables. It is possible to also restore this from the SQLite database but I wouldn't recommend it. My attempt resulted in schema errors. It is easier to let it migrate the databases itself.

To do this you will need to start Home Assistant again and edit the `configuration.yaml` file. Now you can add the custom `recorder` component like this:
```yaml
# Database
recorder:
  db_url: !secret psql_string
  db_retry_wait: 15 # Wait 15 seconds before retrying
  exclude:
    domains:
      - automation
      - updater
    entity_globs:
      - sensor.weather_*
    entities:
      - sun.sun # Don't record sun data
      - sensor.last_boot # Comes from 'systemmonitor' sensor platform
      - sensor.date
    event_types:
      - call_service # Don't record service calls
```

As you can see I am using a `!secret` to hide the password in the configuration file. Thus you will need to add the password to the `secrets.yaml` file or add it to the configuration itself but that's not recommended.
```yaml
# Postgres connection string
psql_string: "postgresql://homeassistant:PASSWORD@192.168.0.XXX/homeassistant_db"
```

The `exclude` section is used to exclude certain data from being recorded. You can find more information about this in the [Home Assistant documentation](https://home-assistant.io/integrations/recorder/).

Now restart Home Assistant, once it is running you should see your normal Home Assistant UI but the history will be empty. You can now stop Home Assistant again.

### Step 4: Migrate the database

**IMPORTANT**: If you are running a database that still contains the `created` column in the `events` table, you **will** need to remove this to migrate the database. Otherwise you will receive an error. The `created` column was removed in a recent Home Assistant update. \
If you are using a recent version of SQLite you can simply open the database and enter `ALTER TABLE events` and afterwards `DROP COLUMN created`. Thanks to a comment for pointing this out.

The second to last step is to migrate the database. I used the tool [pgLoader](https://pgloader.readthedocs.io/en/latest/) to accomplish this. (On Debian-based install via: `apt install pgloader`) \
Create a file `migrate.sql` with the following content. Obviously you will need to change the sqlite database path and the postgres connection string.
```sql
load database
  from 'sqlite:///tmp/home-assistant_v2.db'
  into 'postgresql://homeassistant:PASSWORD@192.168.0.XXX/homeassistant_db'
with data only, drop indexes, reset sequences, truncate, batch rows = 1000
SET work_mem to '32 MB', maintenance_work_mem to '64 MB';
```
Once you have created the file, run the following command:
```bash
pgloader migrate.sql
```

### Step 5: Start Home Assistant

You should now be able to start Home Assistant again and all your data should be migrated. You will notice that loading history data is considerably faster than the SQLite database.

Hopefully this tutorial has helped you migrate your data from SQLite to PostgreSQL. Let me know in the comments if you experience any issues!

