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
  </div>
</template>

<script>
export default {
  name: "BlogSlugPage",
  head () {
    return {
      title: `${this.document.title} | Sigfried Seldeslachts`,
      meta: [
        { hid: "description", name: "description", content: this.document.description || '' },
        { name: "article:published_time", content: this.document.published_at },
        { name: "article:author", content: this.document.author || "Sigfried" },
        { name: 'og:type', hid: 'og:type', content: 'website' },
      ]
    }
  },
  data () {
    return {
      document: {},
    }
  },
  computed: {
    // Format date to a human readable format
    date () {
      const date = new Date(this.document.published_at);
      return date.toLocaleDateString('en-GB');
    },
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
#blog-post {
  @apply container mx-2 sm:mx-auto bg-gray-100 p-6 rounded-lg;

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
