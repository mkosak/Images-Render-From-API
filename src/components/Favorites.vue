<template>
  <ImagesList :favorites="favorites" />
</template>

<script>
import ImagesList from './ImagesList.vue';

export default {
  name: 'Favorites',
  components: {
    ImagesList
  },
  data() {
    return {
      favorites: true
    }
  }
}
</script>
