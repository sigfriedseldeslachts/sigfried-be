<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'LayoutsEmpty',
  head () {
    return {
      meta: [
        { name: 'og:image', content: require('~/assets/images/opengraph_img.jpeg') },
      ]
    }
  }
}
</script>
