<template>
  <div class="image-render__listing">
    <template v-if="images.length && !getError">
      <ImageCard :image="image" v-for="image in images" :key="image.name" />
    </template>
    <template v-else>
      <md-empty-state md-icon="image_not_supported" :md-label="noResults" v-show="!isLoading">
        <md-button @click="reload" class="md-primary md-raised">{{ returnLabel }}</md-button>
      </md-empty-state>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageCard from './ImageCard.vue';

export default {
  name: 'ImagesList',
  components: {
    ImageCard
  },
  props: {
    favorites: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      noResults: 'No images found or something goes wrong',
      returnLabel: 'Refresh the page'
    }
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'getImages',
      'getFavorites',
      'getError'
    ]),
    images() {
      return this.favorites ? this.getFavorites : this.getImages;
    }
  },
  methods: {
    reload() {
      window.location.reload();
    },
    async loadImages() {
      // run spinner
      this.$store.commit('setLoading', true);

      // getting images
      await this.$store.dispatch('fetchImages');

      // stop spinner
      this.$store.commit('setLoading', false);
    }
  },
  beforeMount() {
    this.$store.commit('setFullScreen', false);
    
    // check for images before re-load 
    if (!this.images.length) {
      this.loadImages();
    }
  }
}
</script>

<style lang="scss">
.image-render__listing {
  display: flex;
  flex-flow: wrap;  
  justify-content: space-evenly;
  margin: 0 -12px;
}
</style>
