<template>
  <div id="app">
    <Toolbar v-show="!isFullScreen" />

    <keep-alive exclude="ImagePage">
      <div class="image-render" :class="{ 'image-render--fullscreen': isFullScreen }">
        <div class="image-render__spinner" v-show="isLoading">
          <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
        </div>

        <router-view v-show="!isLoading"></router-view>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImagePage from './components/ImagePage';
import Toolbar from './components/Toolbar';

export default {
  name: 'App',
  components: {
    Toolbar
  },
  computed: {
    ...mapGetters([
      'isLoading',
      'isFullScreen'
    ])
  }
}
</script>

<style lang="scss">
#app {
  min-width: 375px;
}
.image-render {
  height: calc(100vh - 64px);  
  padding: 24px;

  &--fullscreen {
    padding: 0;
    height: 100%;
  }

  @media (max-width: 960px) {
    height: calc(100vh - 48px);
  }

  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
  }
}
</style>
