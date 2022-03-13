<template>
  <div class="hero-canvas-wrapper">
    <canvas id="canvaslines" ref="cvs" />
    <div class="hero-canvas">
      <Navigation />

      <main class="space-y-6">
        <h1 class="text-6xl font-bold text-white">Hello, I'm Sigfried</h1>
        <p class="text-gray-100 text-lg">
          An IT-Guy who is mostly working with networking solutions (BGP, VyOS, Proxmox, ...) but I also enjoy coding and learning new things.
        </p>

        <div>
          <nuxt-link to="/projects" class="bg-transparent rounded-full font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-100 mr-6 border-2 border-gray-100 hover:text-gray-900">
            See some projects
            <svg xmlns="http://www.w3.org/2000/svg" class="inline -mt-0.5 ml-2 w-6 stroke-current stroke-2" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </nuxt-link>
        </div>
      </main>

      <s-footer class="home" />
    </div>
  </div>
</template>

<script>
import { setupCanvas, startAnimation, stopAnimation, startRainbow } from '~/plugins/canvasLines';

export default {
  name: 'IndexPage',
  layout: 'empty',
  data () {
    return {
      input: '',
    }
  },
  beforeRouteLeave (to, from, next) {
    if (process.client) {
      try {
        window.removeEventListener('keypress', this.captureKey);
      } catch (e) {}
    }

    stopAnimation();
    next();
  },
  beforeRouteEnter (to, from, next) {
    startAnimation();
    next();
  },
  methods: {
    // Setup window listener to check if user is typing "rainbow"
    setupRainbowEventListener () {
      if (process.server) return;

      window.addEventListener('keypress', this.captureKey);
    },
    // Capture keypress event
    captureKey (e) {
      const key = e.key.toLowerCase();

      // Check if the pressed key is the next one in the rainbow
      if (key === 'rainbow'.charAt(this.input.length)) {
        this.input += key;
      } else {
        this.input = '';
      }

      // Check if user typed "rainbow"
      if (this.input === 'rainbow') {
        startRainbow();
        this.input = '';
      }
    }
  },
  mounted () {
    setupCanvas(this.$refs.cvs);
    this.setupRainbowEventListener();
  }
}
</script>
