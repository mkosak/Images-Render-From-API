<template>
  <ImagesList favorites="true" />
</template>

<script>
import ImagesList from './ImagesList.vue';

export default {
  name: 'Favorites',
  components: {
    ImagesList
  }
}
</script>
