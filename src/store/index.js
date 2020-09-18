import Vue from 'vue';
import Vuex from 'vuex';
import API from './../api.js';

Vue.use(Vuex);

// localStorage helpers
const saveToLocalStorage = (item, value) => {
  let savedResults = getFromLocalStorage('searchResultsHistory') || [];
  
  savedResults.push(value);

  localStorage.setItem(item, JSON.stringify(savedResults));
};
const getFromLocalStorage = (item) => {
  let res = localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : false;

  return res;
};

// initial state
const state = () => ({
  isLoading: false,
  form: {},
  movies: [],
  resultsHistory: [],
  errorMsg: ''
});

// getters
const getters = {
  getLoading: (state) => {
    return state.isLoading;
  },
  getSearchTerm: (state) => {
    return state.form.searchTerm;
  },
  getMovies: (state) => {
    return state.movies;
  },
  getResultsHistory: (state) => {
    // get results from store first otherwise load from localStorage
    if (state.resultsHistory.lenght) {
      return state.resultsHistory;
    } else {
      return getFromLocalStorage('searchResultsHistory');
    }
  },
  getErrorMsg: (state) => {
    return state.error;
  }
};

// actions
const actions = {
  addLoading({ commit }, isLoading) {
    commit('setLoading', isLoading);
  },
  addForm({ commit }, form) {
    commit('setForm', form);
  },
  async searchMovies({ commit }, term) {
    await API.get(`?s=${term}`).then((res) => {
      if (res.data.Search) {
        commit('setMovies', res.data.Search);
        commit('setError', '');
      } else {
        commit('setMovies', '');
        commit('setError', res.data.Error);
      }
    }).catch((e) => {
      console.log('API has issues', e);
    });
  },
  addResultsHistory({ commit, getters }, results) {
    if (!results.length) return;

    commit('setResultsHistory', { term: getters.getSearchTerm, results });
  },
  addMoveis({ commit }, movies) {
    commit('setMovies', movies);
  }
};

// mutations
const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setForm(state, form) {
    state.form = Object.assign({}, state.form, form);
  },
  setMovies(state, movies) {
    state.movies = movies;
  },
  setResultsHistory(state, history) {
    const results = { term: history.term, results: history.results };
    state.resultsHistory.push(results);

    // save results to localStorage
    saveToLocalStorage('searchResultsHistory', results);
  },
  setError(state, error) {
    state.errorMsg = error;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
