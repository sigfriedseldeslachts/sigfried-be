<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'LayoutsEmpty',
  head () {
    return {
      meta: [
        { property: 'og:image', hid: 'og:image', content: require('~/assets/images/opengraph_img.jpeg') },
      ]
    }
  }
}
</script>
