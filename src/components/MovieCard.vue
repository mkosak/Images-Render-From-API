<template>
  <md-card class="movie-finder-card">
    <md-card-media-cover md-solid>
      <md-card-media md-ratio="1:1">
        <img :src="item.Poster" :alt="item.Title" />
      </md-card-media>

      <md-card-area>
        <md-card-header>
          <span class="md-title">{{ item.Title }}</span>
          <span class="md-subhead">Year: {{ item.Year }}</span>
        </md-card-header>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-finder-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
