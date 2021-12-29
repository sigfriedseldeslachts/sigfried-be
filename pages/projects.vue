<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>My Projects</h1>
    </div>

    <div class="h-full">
      <section class="container mx-auto">
        <div class="project-list">
          <article v-for="project in projects" :key="project.name" :aria-labelledby="'project-title-' + project.name">
            <a :href="project.images[project.mainImage].src" target="_blank" @click.prevent="showImages(project.images, project.mainImage)" v-if="project.images !== null && project.mainImage !== null && project.mainImage >= 0">
              <img :src="project.imgThumb ? project.imgThumb : project.images[project.mainImage].src" :alt="project.images[project.mainImage].alt">
            </a>
            <div class="flex-1 flex items-center justify-center text-gray-500" v-else>
              <span>No image available.</span>
            </div>

            <div class="content">
              <h3 :id="'project-title-' + project.name">{{ project.name }}</h3>
              <p>{{ project.description }}</p>

              <div class="button-group">
                <span><a :href="project.url" ref="noreferrer noopener" v-if="project.url !== null" class="view-button">View project</a></span>
                <span><a href="#" v-if="Array.isArray(project.images) && project.images.length > 1" @click.prevent="showImages(project.images, project.mainImage)">View all images</a></span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <client-only>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
    </client-only>
  </div>
</template>

<script>
import projects from '~/plugins/projects.js';

export default {
  name: 'ProjectsIndexPage',
  data () {
    return {
      visible: false,
      imgs: [],
      index: 0
    }
  },
  methods: {
    showImages (imgs, index) {
      this.imgs = imgs;
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
  computed: {
    projects () {
      return projects;
    }
  }
}
</script>

<style lang="scss">
.project-list {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4;

  article {
    @apply flex flex-col justify-end bg-gray-100 text-bg-mid-blue shadow-inner rounded-lg tracking-wide;

    a {
      @apply flex flex-1 items-center;

      img {
        @apply w-full h-full object-cover object-top rounded-lg max-h-48;
      }
    }

    .content {
      @apply p-6;

      h3 {
        @apply text-xl font-bold;
      }

      .button-group {
        @apply mt-2 flex flex-row items-center space-x-4;
      }

      a {
        &.view-button {
          @apply px-3 py-2 rounded bg-gradient-to-br from-bg-light-blue via-bg-mid-blue to-bg-dark-blue text-white;
        }
      }
    }
  }
}
</style>
