<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>Contact me</h1>
      <p>You can contact me via various ways.</p>
    </div>

    <section aria-labelledby="contactmeh1" id="contactme-section">
      <div aria-labelledby="contact-info" class="contact-info-card">
        <h3 id="contact-info">Contact information</h3>

        <dl>
          <dt>
            <span><fa :icon="icons.faEnvelope" /></span>
            Email
          </dt>
          <dd>
            me [at] sigfried.be

            <p class="subinfo">For secure communication use my GPG Key! (See Keybase profile)</p>
          </dd>

          <dt>Matrix</dt>
          <dd><a href="https://matrix.to/#/@sigfried:sigfried.be">@sigfried:sigfried.be</a></dd>

          <dt>
            <span><fa :icon="icons.faDiscord" /></span>
            Discord
          </dt>
          <dd>Sigfried#8473</dd>

          <dt>
            <span><fa :icon="icons.faTelegram" /></span>
            Telegram
          </dt>
          <dd><a href="https://t.me/Sigfried" rel="nofollow, noreferrer">t.me/Sigfried</a></dd>
        </dl>
      </div>

      <aside aria-labelledby="other-socials">
        <h3 id="other-socials">Other social information</h3>
        <dl>
          <dt>
            <span><fa :icon="icons.faLinkedin" /></span>
            LinkedIn
            </dt>
          <dd><a href="https://www.linkedin.com/in/sigfried-seldeslachts-941b92184/" rel="noreferrer,noopener">linkedin.com/in/sigfried-seldeslachts-941b92184</a></dd>

          <dt>
            <span><fa :icon="icons.faGithub" /></span>
            GitHub
          </dt>
          <dd><a href="https://github.com/sigfriedseldeslachts" rel="noopener noreferrer">sigfriedseldeslachts</a></dd>

          <dt>
            <span><fa :icon="icons.faKeybase" /></span>
            Keybase
          </dt>
          <dd><a href="https://keybase.io/sigfriedbe" rel="noopener noreferrer">SigfriedBE</a></dd>

          <dt>
            <span><fa :icon="icons.faGitlab" /></span>
            GitLab
          </dt>
          <dd><a href="https://gitlab.com/djsigfried56">djsigfried56</a></dd>
        </dl>
      </aside>
    </section>
  </div>
</template>

<script>
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegram, faLinkedin, faKeybase, faGitlab, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default {
  name: 'ContactPage',
  head () {
    return {
      title: 'Contact | Sigfried Seldeslachts',
    }
  },
  computed: {
    icons() {
      return {
        faEnvelope,
        faGithub,
        faTelegram,
        faLinkedin,
        faKeybase,
        faGitlab,
        faDiscord
      };
    }
  }
}
</script>

<style lang="scss">
#contactme-section {
  @apply grid grid-cols-1 md:grid-cols-2 container px-2 sm:mx-auto justify-center items-start;

  .contact-info-card {
    @apply px-6 py-4 bg-gray-100 rounded-lg shadow-lg;

    dl {
      dt {
        @apply text-gray-600;
      }

      dd {
        a {
          @apply text-bg-light-blue border-bg-light-blue;
        }

        .subinfo {
          @apply text-gray-600 text-sm;
        }
      }
    }
  }

  dl {
    @apply mt-2;

    dd {
      @apply mb-4;

      a {
        @apply border-b hover:border-opacity-0 transition-all duration-300 ease-in-out;
      }

      &:last-child {
        @apply mb-0;
      }
    }
  }

  h3 {
    @apply text-2xl;
  }

  aside {
    @apply text-white px-3 pt-8 md:pt-0 md:px-0 md:pl-6;

    dl {
      dt {
        @apply text-gray-300;
      }

      dd {
        a {
          @apply text-accent-primary border-accent-primary;
        }
      }
    }
  }
}
</style>
