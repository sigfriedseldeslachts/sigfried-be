<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1 id="blog-post-title">{{ document.title }}</h1>
      <p>Published on: <time :datetime="date">{{ date }}</time></p>
    </div>

    <section id="blog-post" aria-labelledby="blog-post-title">
      <p>{{ document.description }}</p>

      <NuxtContent :document="document" />
    </section>

    <client-only>
      <section id="blog-post-comments">
        <div id="commento-box" />
      </section>
    </client-only>
  </div>
</template>

<script>
import { loadCommento } from '~/plugins/commento';

export default {
  name: "BlogSlugPage",
  head () {
    return {
      title: this.document.title,
      meta: [
        { hid: "description", name: "description", content: this.document.description || '' },
        { property: "article:published_time", content: this.document.published_at },
        { property: "article:author", content: this.document.author || "Sigfried" },
        { property: 'og:type', hid: 'og:type', content: 'website' },
      ]
    }
  },
  data () {
    return {
      document: {},
    }
  },
  methods: {
    async loadRemark42 () {
      // If is server, stop here
      if (process.server) return;

      // On next tick, load comment section
      this.$nextTick(() => {
        try {
          loadCommento(this.$config.commentoUrl, `blog-${this.$route.params.slug}`);
        } catch (e) {
          console.error("Couldn't initalize commento:", e);
        }
      });
    }
  },
  computed: {
    // Format date to a human readable format
    date () {
      const date = new Date(this.document.published_at);
      return date.toLocaleDateString('en-GB');
    },
  },
  mounted () {
    this.loadRemark42();
  },
  async asyncData({ $content, params, error }) {
    try {
      const document = await $content(params.slug).fetch();

      return { document };
    } catch (err) {
      error({ statusCode: 404 });
    }
  }
}
</script>

<style lang="scss">
#blog-post-comments {
  @apply mt-2;
}

#blog-post, #blog-post-comments {
  @apply container sm:w-full mx-0 sm:mx-auto rounded-lg;
}

#blog-post {
  @apply bg-gray-100 p-6;

  h2 {
    @apply font-bold text-xl mt-4 mb-3;
  }

  h3 {
    @apply font-bold text-lg mt-4 mb-2;
  }

  h4 {
    @apply font-bold mt-4 mb-1;
  }

  p {
    @apply text-gray-700 mb-3;

    &:last-child {
      @apply mb-0;
    }
  }

  a {
    @apply text-bg-light-blue border-bg-light-blue border-b hover:border-opacity-0 transition-all duration-300 ease-in-out;
  }

  ul, ol {
    @apply text-gray-800 mb-3;
  }

  ul {
    @apply list-inside list-disc;
  }

  ol {
    @apply list-inside list-decimal;
  }

  code {
    @apply bg-gray-200 p-0.5 rounded font-mono;
  }

  pre {
    @apply bg-gray-200 p-2.5 rounded font-mono my-3;

    code {
      @apply bg-transparent p-0 rounded;
    }
  }
}
</style>
