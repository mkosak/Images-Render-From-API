<template>
  <md-toolbar class="md-primary movie-finder-toolbar">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <a to="/">
          <span class="md-title">MovieFinder</span>
        </a>
      </div>
      <div class="md-toolbar-section-end">
        <md-button to="/">Home</md-button>
        <md-button to="/results">Results</md-button>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<style lang="scss">
.movie-finder-toolbar .router-link-exact-active {
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: currentColor;
    opacity: .12;
    transition: .4s cubic-bezier(.4,0,.2,1);
    will-change: background-color,opacity;
    content: " ";
  }
}
</style>
