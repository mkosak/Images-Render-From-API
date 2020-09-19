<template>  
  <figure 
    class="image-render__full-screen" 
    :class="{ 'show': !isLoading }"
    :style="`background: center / cover no-repeat url(${image.src})`">
    <img 
      class="image-render__full-screen__image"
      :ref="'image' + image.name"
      :src="image.src" 
      :alt="image.name" 
    />
    <!-- <img 
      class="image-render__full-screen__image" 
      :class="{ 'show': !isLoading }"
      :ref="'image' + image.name"
      :src="image.src" 
      :alt="image.name" 
    /> -->
    <figcaption class="image-render__full-screen__caption">{{ image.name }}</figcaption>
  </figure>
</template>

<script>
import CONFIG from '../config';

export default {
  name: 'ImagePage', 
  data() {
    return {
      isLoading: true,
      imagePassed: this.$route.query.image,
      imageLoad: {
        name: this.$route.params.id,
        getSrc: CONFIG.API_URL + this.$route.params.id,
        src: 'assets/blank.gif'
      }
    }
  },
  computed: {
    image() {
      return this.imagePassed || this.imageLoad;
    }
  },
  methods: {
    loadImage(img, fn) {
      console.log('loadImage'); 
      const tempImg = new Image();
      const getSrc = this.image.getSrc;
      let image = this.image;

      tempImg.onload = function() {
        console.log(image);
        image.src = getSrc;

        fn ? fn() : null;
      }

      tempImg.src = getSrc;
    }
  },
  created() {
    this.$store.dispatch('addFullScreen', true);

    if (!this.$route.query.image) {
      if (!this.$route.params.id) return;

      this.$nextTick(() => {
        // get image element
        const refImg = this.$refs['image' + this.$route.params.id];
        console.log('refImg', refImg);

        this.loadImage(refImg, () => {
          console.log('image is loaded');
          // timeout is for visual purpose only
          setTimeout(() => {
             this.isLoading = false;
          }, 500);
        });
      });
    } else {


      this.isLoading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.image-render__full-screen {
  margin: 0;
  height: 100vh;

  &__image {
    visibility: hidden;
  }

  // &__image {
  //   filter: blur(15px);
  //   transition: filter .5s ease;
  // }

  // .show {
  //   filter: blur(0);    
  // }

  &__caption {
    color: #fff;
  } 
}
</style>
