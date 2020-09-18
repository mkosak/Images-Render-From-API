<template>
  <div class="movie-finder">
    <md-field @keyup.enter.native="searchMovies">
      <input 
        class="md-input" 
        :value="searchTerm" 
        @input="updateSearchTerm" 
        placeholder="Type to search movie" />
      <span class="md-helper-text">{{ searchHelperText || errorMsg }}</span>
      <md-button 
        type="submit" 
        class="md-primary movie-finder__search-button" 
        @click="searchMovies" 
        :disabled="isLoading">SEARCH</md-button>
    </md-field>

    <div class="movie-finder__spinner" v-show="isLoading">
      <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
    </div>

    <div class="movie-finder__search-history" v-show="getResultsHistory.length && !isLoading">
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">Search history</h1>
        </md-table-toolbar>

        <md-table-row>
          <md-table-head>Search Term</md-table-head>
          <md-table-head>Results</md-table-head>
          <md-table-head>Action</md-table-head>
        </md-table-row>

        <md-table-row v-for="(history, index) in getResultsHistory" :key="`${history.term}_${index}`">
          <md-table-cell>{{ history.term }}</md-table-cell>
          <md-table-cell>{{ history.results.length }}</md-table-cell>
          <md-table-cell>
            <md-button 
              type="submit" 
              class="md-primary movie-finder__search-history__button" 
              @click="showResults(history.term)">SHOW</md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchHelperText: ''
    }
  },
  computed: {
    ...mapState(['form', 'errorMsg']),
    searchTerm: {
      set(searchTerm) {
        this.$store.commit('addForm', { searchTerm });
      },
      get() {
        return this.form.searchTerm;
      }
    },
    isLoading() {
      return this.$store.getters.getLoading;
    },
    getResultsHistory() {
      return this.$store.getters.getResultsHistory;
    },
    getMovies() {
      return this.$store.getters.getMovies;
    }
  },
  methods: {
    updateSearchTerm(e) {
      this.$store.commit('setForm', { searchTerm: e.target.value });
    },
    async searchMovies() {
      const term = this.form.searchTerm;

      // check if results already found
      if (this.getResultsHistory.length && this.getResultsHistory.find(item => item.term === term)) {
        this.searchHelperText = 'Already found';
      } else {
        // run spinner
        this.$store.dispatch('addLoading', true);

        // save search term
        this.$store.dispatch('addForm', term);

        // search movies
        await this.$store.dispatch('searchMovies', term);

        // save search result
        this.$store.dispatch('addResultsHistory', this.getMovies);

        // stop spinner
        this.$store.dispatch('addLoading', false);

        // navigate to the results page
        this.$router.push({ path: 'results' });
      }
    },
    showResults(term) {
      const movies = this.getResultsHistory.find(item => item.term === term);

      // show stored search results
      this.$store.dispatch('addMoveis', movies.results);

      // navigate to the results page
      this.$router.push({ path: 'results' })
    }
  },
  created() {
    this.$store.dispatch('addForm');
  }
}
</script>

<style lang="scss" scoped>
.movie-finder {
  &__search-button {
    margin-top: -2px;
  }
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
  &__search-history {
    margin: 3rem 0;
    
    &__button {
      margin-left: -24px;
    }
  }
}
</style>
