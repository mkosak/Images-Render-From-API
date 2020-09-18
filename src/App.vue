<template>
  <div id="app">
    <Toolbar />

    <div>
      <md-app class="movie-finder-container">
        <md-app-content>
          <router-view></router-view>
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar';

export default {
  name: 'App',
  components: {
    Toolbar
  }
}
</script>

<style lang="scss">
.movie-finder-container {
  height: calc(100vh - 64px);
  min-width: 480px;

  @media (max-width: 960px) {
    height: calc(100vh - 48px);
  }
}
</style>
