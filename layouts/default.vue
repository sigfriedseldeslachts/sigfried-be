<template>
  <div class="hero-canvas-wrapper">
    <canvas id="canvaslines" ref="cvs" />
    <div class="hero-canvas">
      <Navigation />

      <main class="">
        <Nuxt />
      </main>

      <s-footer />
    </div>
  </div>
</template>

<script>
import { setupCanvas } from '~/plugins/canvasLines';

export default {
  name: 'LayoutsPages',
  mounted () {
    setupCanvas(this.$refs.cvs);
    this.$root.$emit('startAnimation');
  }
}
</script>
