export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sigfried Seldeslachts',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An IT-Guy who is mostly working with networking solutions (BGP, VyOS, Proxmox, ...) but I also enjoy coding and learning new things.' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:type', hid: 'og:type', content: 'website' },
    ],
    link: [
    //  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-lightbox', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/fontawesome-module
    ['@nuxtjs/fontawesome', {
      component: 'fa',
      suffix: false,
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Sitemap module configuration: https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: 'https://sigfried.be',
    gzip: true,
    routes: async () => {
      const { $content } = require("@nuxt/content");
      const files = await $content().only(["slug"]).fetch();

      return files.map((file) => ("/blog/" + file.slug));
    }
  }
}
