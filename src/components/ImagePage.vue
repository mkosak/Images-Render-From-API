<template>  
  <figure 
    class="image-render__full-screen"
    :style="`background: center / cover no-repeat url(${image.src})`">
    <!-- this image is hidden and use for the onload event purpose -->
    <img 
      class="image-render__full-screen__image"
      :ref="'image' + image.name"
      :src="image.src"
    />
    <md-button class="md-icon-button md-raised image-render__full-screen__button" @click="goToHome">
      <md-icon>close</md-icon>
    </md-button>
    <figcaption class="image-render__full-screen__caption">{{ image.name }}</figcaption>
  </figure>
</template>

<script>
import CONFIG from '../config';
import { mapGetters } from 'vuex';

export default {
  name: 'ImagePage', 
  data() {
    return {
      imageToLoad: {
        name: this.$route.params.id,
        getSrc: CONFIG.API_URL + this.$route.params.id,
        src: 'assets/blank.gif'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getSavedFullScreenImg'
    ]),
    image() {
      // check if we have saved image or if we need to load it
      return this.getSavedFullScreenImg || this.imageToLoad;
    }
  },
  methods: {    
    goToHome() {      
      this.$router.go(-1);
      this.$store.commit('setFullScreen', false);
    },
    loadImage(img, fn) {
      const tempImg = new Image();
      const getSrc = this.image.getSrc;
      const image = this.image;

      tempImg.onload = function() {
        image.src = getSrc;

        fn ? fn() : null;
      }

      tempImg.src = getSrc;
    }
  },
  created() {
    this.$store.commit('setFullScreen', true);    

    // check if how we got to the page from home and have saved image or via the router param
    if (!this.getSavedFullScreenImg) {
      this.$store.commit('setLoading', true);

      // get image html element reference
      const refImg = this.$refs['image' + this.$route.params.id];

      // load image
      this.loadImage(refImg, () => {
        this.$store.commit('setLoading', false);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.image-render__full-screen {
  position: relative;
  margin: 0;
  height: 100vh;

  &__image {
    visibility: hidden;
  }

  &__button {
    position: absolute;
    top: 40px;
    right: 40px;
  }

  &__caption {
    color: #fff;
    position: absolute;
    top: 52px;
    right: 100px;
    font-size: 40px;
  } 
}
</style>
