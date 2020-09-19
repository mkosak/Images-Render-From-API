<template>
  <md-card class="image-render-card">
    <div class="image-render-card__inner" @click="goToFullImage">
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="16:9">
          <!-- <img src="assets/blank.gif" class="img" :class="{ show: !loading }" :alt="image.name" :data-src="dataSrc" :ref="'image' + image.name" /> -->
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
  data() {
    return {
      loading: true,
      dataSrc: CONFIG.API_URL + this.image.name
    }
  },
  methods: {
    goToFullImage() {      
      this.$router.push({ path: `/image/${this.image.name}`, query: { image: this.image } })
    },
    // loadImage(img, fn) {      
    //   const tempImg = new Image();
    //   const src = this.dataSrc;

    //   tempImg.onload = function() {
    //     img.src = src;        

    //     fn ? fn() : null;
    //   }

    //   tempImg.src = src;
    // }
  },
  mounted() {
    // const uint8Array = new Uint8Array(this.image.src);    
    // const binary = uint8Array.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');    
    // const data = window.btoa( binary );

    // this.image.src = `data:image/jpg;base64,${data}`;
    // this.loading = false;

    // console.log('src', src);

    // this.$nextTick(() => {
    //   // get image element
    //   const refImg = this.$refs['image' + this.image.name];

    //   this.loadImage(refImg, () => {
    //     // timeout is for visual purpose only
    //     // setTimeout(() => {
    //     //    this.loading = false;
    //     // }, 500);
    //     this.loading = false;
    //   });
    // });
  }
}
</script>

<style lang="scss" scoped>
.image-render-card {
  display: inline-block;
  min-width: 31.2%;
  margin: 0 10px 20px;  
  vertical-align: top;
  
  &__inner {
    overflow: hidden;
  }

  // &__wrap {
  //   text-align: center;
  //   position: relative;
    
  //   // .spinner {
  //   //   position: absolute;
  //   //   top: 50%;
  //   //   left: 50%;
  //   //   transform: translate(-50%, -50%);
  //   //   opacity: 1;
  //   //   animation: none;
  //   //   transition: opacity .5s ease;
  //   // }

  //   .img {
  //     // opacity: 1;
  //     filter: blur(15px);
  //     transition: filter .5s ease;
  //   }

  //   .hidden {
  //     opacity: 0;
  //   }

  //   .show {
  //     filter: blur(0);
  //     // opacity: 0;      
  //   }
  // }

  &__caption {
    transform: translateY(100%);
    transition: transform .25s ease;
  }

  &:hover {
    cursor: pointer;

    .image-render-card__caption {
      transform: none;
    }
  }
}
</style>
