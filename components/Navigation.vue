<template>
  <nav>
    <ul>
      <li><nuxt-link to="/" aria-label="Home">Sigfried</nuxt-link></li>
      <li><nuxt-link to="/projects">Projects</nuxt-link></li>
      <li><a href="https://sigfried.be/blog/">Blog</a></li>
      <li><nuxt-link to="/tools">Tools</nuxt-link></li>
      <li><nuxt-link to="/contact">Contact</nuxt-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavigationComponent'
}
</script>

<style lang="scss">
nav {
  @apply flex justify-center pt-10 pb-0;

  ul {
    @apply flex flex-row justify-center w-full text-lg font-bold text-center space-x-2 sm:space-x-16 md:space-x-24;

    li {
      @apply flex-grow sm:flex-grow-0;

      a {
        @apply text-gray-100 hover:text-gray-300 transition duration-300 ease-in-out border-b-0;
      }
    }
  }
}
</style>
