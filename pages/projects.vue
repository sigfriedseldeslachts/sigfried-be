<template>
  <div class="component-wrapper">
    <div class="title-section">
      <h1>Some of my Projects</h1>
    </div>

    <div class="h-full">
      <section class="container mx-auto">
        <div class="cards-list">
          <article v-for="project in projects" :key="project.name" :aria-labelledby="'project-title-' + project.name">
            <a :href="project.images[project.mainImage].src" target="_blank" @click.prevent="showImages(project.images, project.mainImage)" v-if="project.images !== null && project.mainImage !== null && project.mainImage >= 0">
              <img :src="project.imgThumb ? project.imgThumb : project.images[project.mainImage].src" :alt="project.images[project.mainImage].alt">
            </a>
            <div class="flex-1 flex items-center justify-center text-gray-500" v-else>
              <span class="py-4 px-2">No image available.</span>
            </div>

            <div class="content">
              <h3 :id="'project-title-' + project.name">{{ project.name }}</h3>
              <p>{{ project.description }}</p>

              <div class="button-group">
                <span v-if="project.url !== null">
                  <!-- If router is false, use a regular link -->
                  <a :href="project.url" ref="noreferrer noopener" v-if="!project.router" class="view-button">View project</a>
                  <!-- Otherwise a Nuxt link -->
                  <nuxt-link :to="project.url" class="view-button" v-else>View project</nuxt-link>
                </span>
                <span><a href="#" v-if="Array.isArray(project.images) && project.images.length > 1" @click.prevent="showImages(project.images, project.mainImage)" class="mid-blue">View all images</a></span>
              </div>

              <span v-if="Array.isArray(project.tags) && project.tags.length > 0" class="tags-wrapper">
                <span class="sr-only">The following technologies were used:</span>
                <button type="button" v-for="tag in project.tags" :key="tag" class="tag" @click.prevent="addSelectedTag(tag)">
                  {{ tag }} <span aria-label="Deselect this tag" v-if="isTagSelected(tag)">&times;</span>
                </button>
              </span>
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
      index: 0,
      selectedTags: [],
    }
  },
  head () {
    return {
      title: 'Projects',
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
    addSelectedTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
      } else {
        this.selectedTags.push(tag);
      }
    },
    isTagSelected (tag) {
      return this.selectedTags.includes(tag);
    }
  },
  computed: {
    projects () {
      // If no tags are selected, return all projects
      if (this.selectedTags.length === 0) {
        return projects;
      }

      // Otherwise, filter projects by tags
      return projects.filter((project) => {
        if (Array.isArray(project.tags)) {
          return project.tags.some((tag) => this.selectedTags.includes(tag));
        }

        return false;
      });
    }
  }
}
</script>
