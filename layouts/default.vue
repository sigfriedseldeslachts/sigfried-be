<template>
  <div class="wrapper">
    <Navigation />

    <main class="">
      <Nuxt />
    </main>

    <s-footer />
  </div>
</template>

<script>
export default {
  name: 'LayoutsPages',
  head () {
    return {
      meta: [
        { property: 'og:image', hid: 'og:image', content: require('~/assets/images/opengraph_img.jpeg') },
      ]
    }
  }
}
</script>
