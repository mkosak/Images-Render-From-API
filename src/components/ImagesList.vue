<template>
  <div class="image-render__listing">
    <template v-if="images.length">
      <ImageCard :image="image" v-for="image in images" :key="image.name" />
    </template>
    <template v-else>
      <md-empty-state md-icon="tv" md-label="No images found" v-if="!isLoading">
        <md-button to="/" class="md-primary md-raised">Return to Home</md-button>
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
  computed: {
    ...mapGetters([
      'isLoading',
      'getImages',
      'getFavorites'
    ]),
    images() {
      return this.favorites ? this.getFavorites : this.getImages;
    }
  },
  methods: {
    async loadImages() {
      // run spinner
      console.log('run loader');
      this.$store.dispatch('addLoading', true);

      // getting images
      await this.$store.dispatch('fetchImages');

      console.log('images ready', this.images);

      // stop spinner
      this.$store.dispatch('addLoading', false);
    }
  },
  beforeMount() {
    console.log('beforeMount');
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
  justify-content: space-between;
  margin: 0 -12px;
}
</style>
