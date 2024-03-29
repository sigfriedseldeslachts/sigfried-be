<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>Contact me</h1>
      <p>You can contact me via various ways.</p>
    </div>

    <section id="contactme-section">
      <div aria-labelledby="contact-info" class="contact-info-card">
        <h3 id="contact-info">Contact information</h3>

        <dl>
          <dt>
            <span class="icon"><fa :icon="icons.faEnvelope" /></span>
            Email
          </dt>
          <dd>
            <div v-show="!solved && !showError">
              <p>Solve the captcha to see the contact e-mail.</p>
              <div ref="turnstile" />
            </div>
            <p v-show="showError">An error occured while loading the captcha.</p>
            <a v-if="solved" :href="'mailto:' + result">{{ result }}</a>
          </dd>

          <dt>Matrix</dt>
          <dd><a href="https://matrix.to/#/@sigfried:sigfried.be">@sigfried:sigfried.be</a></dd>

          <dt>
            <span class="icon"><fa :icon="icons.faDiscord" /></span>
            Discord
          </dt>
          <dd>Sigfried#8473</dd>
        </dl>
      </div>

      <aside aria-labelledby="other-socials">
        <h3 id="other-socials">Other social information</h3>
        <dl>
          <dt>
            <span class="icon"><fa :icon="icons.faLinkedin" /></span>
            LinkedIn
            </dt>
          <dd><a href="https://www.linkedin.com/in/sigfried-seldeslachts-941b92184/" rel="noreferrer,noopener">linkedin.com/in/sigfried-seldeslachts-941b92184</a></dd>

          <dt>
            <span class="icon"><fa :icon="icons.faGithub" /></span>
            GitHub
          </dt>
          <dd><a href="https://github.com/sigfriedseldeslachts" rel="noopener noreferrer">sigfriedseldeslachts</a></dd>

          <dt>
            <span class="icon"><fa :icon="icons.faKeybase" /></span>
            Keybase
          </dt>
          <dd><a href="https://keybase.io/sigfriedbe" rel="noopener noreferrer">SigfriedBE</a></dd>

          <dt>
            <span class="icon"><fa :icon="icons.faGitlab" /></span>
            GitLab
          </dt>
          <dd><a href="https://gitlab.com/djsigfried56" rel="noopener noreferrer">djsigfried56</a></dd>

          <dt>
            <span class="icon"><fa :icon="icons.faMastodon" /></span>
            Mastodon
          </dt>
          <dd><a rel="me" href="https://mastodon.social/@Sigfried">mastodon.social@Sigfried</a></dd>
        </dl>
      </aside>
    </section>
  </div>
</template>

<script>
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegram, faLinkedin, faKeybase, faGitlab, faDiscord, faMastodon } from '@fortawesome/free-brands-svg-icons';

export default {
  name: 'ContactPage',
  head () {
    return {
      title: 'Contact',
    }
  },
  data () {
    return {
      solved: false,
      showError: false
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
        faDiscord,
        faMastodon
      };
    },
    result () {
      return Buffer.from('aW5mb0BzaWdmcmllZC5iZQ==', 'base64').toString();
    }
  },
  methods: {
    turnstile () {
      try {
        window.turnstile.ready(() => {
          turnstile.render(this.$refs.turnstile, {
            sitekey: '0x4AAAAAAAP824KZpnPuELGa',
            callback: (result) => {
              console.log(result);
              this.solved = true;
            }
          });
        });
      } catch (e) {
        if (this.showError) return;
        this.showError = true;
        setTimeout(() => {
          this.turnstile();
        }, 2000);
      }
    }
  },
  mounted () {
    this.turnstile();
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

    dt {
      @apply flex items-center;

      .icon {
        @apply h-4 w-4 inline-block mr-1;
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
