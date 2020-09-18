<template>
  <div>
    <template v-if="moviesList.length">
      <carousel :scrollPerPage="true" :perPageCustom="carouselResponsive">
        <slide v-for="movie in moviesList" :key="movie.id">
          <MovieCard :item="movie" />
        </slide>
      </carousel>
      <div class="back-home">
        <md-button class="md-dense md-primary" to="/">Back to Home</md-button>
      </div>
    </template>
    <template v-else>
      <md-empty-state md-icon="tv" md-label="No movies found">
        <md-button to="/" class="md-primary md-raised">Return to Home</md-button>
      </md-empty-state>
    </template>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import MovieCard from './MovieCard.vue';

export default {
  name: 'Results',
  data() {
    return {
      carouselResponsive: [[480, 1], [768, 2], [1160, 3], [1433, 4], [1920, 5]]
    }
  },
  components: {
    Carousel,
    Slide,
    MovieCard
  },
  computed: {
    moviesList() {
      return this.$store.getters.getMovies;
    }
  }
}
</script>

<style scoped>
.back-home {
  padding: 2rem 0;
  text-align: center;
}
.VueCarousel-slide {
  text-align: center;
}
</style>
