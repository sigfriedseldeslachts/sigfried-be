<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1 id="tools-title">Tools</h1>
    </div>

    <div class="container mx-auto">
      <div class="cards-list">
        <article v-for="tool in toolList" :key="tool.title">
          <div class="content">
            <h3>
              <router-link :to="{ name: tool.router}" class="mid-blue no-border">
                {{ tool.title }}
              </router-link>
            </h3>
            <p>{{ tool.description }}</p>

            <div class="button-group">
              <span>
                <nuxt-link v-if="tool.router" :to="{ name: tool.router }" class="view-button">Explore</nuxt-link>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import toolList from '~/plugins/tools/list';

export default {
  name: 'ToolsIndexPage',
  head () {
    return {
      title: 'Tools',
    }
  },
  data () {
    return {
      toolList
    }
  }
}
</script>
