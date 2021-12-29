<template>
  <div class="error-page">
    <section>
      <slot v-if="error.statusCode === 404">
        <h1>Page not found</h1>
        <p>The requested page could not be found.</p>
      </slot>
      <h1 v-else>An error occurred</h1>

      <NuxtLink to="/">Back to the home page</NuxtLink>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LayoutsError',
  props: ['error'],
}
</script>

<style lang="scss">
.error-page {
  @apply flex flex-1 justify-center items-center;

  section {
    @apply m-4 text-white;
  }

  h1 {
    @apply text-4xl font-bold mb-1;
  }

  a {
    @apply mt-4 block underline hover:no-underline;
  }
}
</style>

