<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1 id="blog-post-title">Blog</h1>
    </div>

    <div class="container mx-auto">
      <div class="cards-list">
        <article v-for="post in posts" :key="post.slug">
          <div class="content">
            <h3>
              <router-link :to="{ name: 'blog-slug', params: { slug: post.slug } }">
                {{ post.title }}
              </router-link>
            </h3>
            <p>{{ post.description }}</p>

            <div class="button-group">
              <span>
                <nuxt-link :to="{ name: 'blog-slug', params: { slug: post.slug } }" class="view-button">Read more</nuxt-link>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogIndexPage',
  head () {
    return {
      title: 'Blog | Sigfried Seldeslachts',
    }
  },
  data () {
    return {
      posts: [],
    }
  },
  async asyncData ({ $content }) {
    const posts = await $content().only(['title', 'slug', 'description', 'published_at']).fetch();

    return { posts };
  }
}
</script>
