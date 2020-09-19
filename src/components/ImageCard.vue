<template>
  <md-card class="image-render-card">
    <div class="image-render-card__inner" @click="goToFullImage">
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="16:9">
          <img :src="image.src" :alt="image.name" />
        </md-card-media>

        <md-card-area class="image-render-card__caption">
          <md-card-header>
            <span class="md-title">{{ image.name }}</span>
            <span class="md-subhead">{{ image.width }}x{{ image.height }}</span>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </div>
  </md-card>
</template>

<script>
import CONFIG from './../config';

export default {
  name: 'ImageCard',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToFullImage() {      
      this.$store.commit('saveFullScreenImage', this.image); // save the image
      this.$router.push({ path: `/image/${this.image.name}` });
    }
  }
}
</script>

<style lang="scss" scoped>
.image-render-card {
  display: inline-block;
  min-width: 18.7%;
  margin: 0 10px 20px;  
  vertical-align: top;

  &:hover {
    cursor: pointer;

    .image-render-card__caption {
      transform: none;
    }
  }

  @media (max-width: 1680px) {  min-width: 23.2%; }
  @media (max-width: 1180px) {  min-width: 30.6%; }
  @media (max-width: 767px) {   min-width: 45.6%; }
  @media (max-width: 480px) {   min-width: 94%; }
  
  &__inner {
    overflow: hidden;
  }

  &__caption {
    transform: translateY(100%);
    transition: transform .25s ease;
  }
}
</style>
