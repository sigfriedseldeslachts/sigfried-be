<template>
  <footer>
    <div class="footer-container">
      <div class="col-span-2">
        Made by Sigfried
      </div>
      <div></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "sFooter",
}
</script>

<style lang="scss">
footer {
  @apply bg-transparent text-gray-200;

  .footer-container {
    @apply grid grid-cols-4 text-sm container mx-auto px-4 py-6;
  }

  &.white {
    @apply bg-white text-gray-800;
  }
}
</style>
