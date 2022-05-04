<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>Aircraft Feeder</h1>
      <p>
        At home I run an ADS-B FlightFeeder, it is currently mounted on the top of my roof. Below you can find the list of detected aircraft.<br>
        You can open this in <a :href="$config.piAwareUrl" rel="nofollow">in fullscreen</a>.
      </p>
    </div>

    <div class="h-full">
      <iframe :src="$config.piAwareUrl" frameborder="0" class="w-full h-full" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AircraftPage",
  head() {
    return {
      title: "Aircraft"
    };
  }
}
</script>
