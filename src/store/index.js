import Vue from 'vue';
import Vuex from 'vuex';
import CONFIG from './../config';
import API from './../api';

Vue.use(Vuex);

// initial state
const state = () => ({
  isLoading: false,
  images: [],
  favorites: [],
  isFullScreen: false,
  errorMsg: 'Something goes wrong'
});

// getters
const getters = {
  isLoading: (state) => {
    return state.isLoading;
  },
  getImages: (state) => {
    return state.images;
  },
  isFullScreen: (state) => {
    return state.isFullScreen;
  }
};

// actions
const actions = {
  addLoading({ commit }, boolean) {
    commit('setLoading', boolean);
  },
  addFullScreen({ commit }, boolean) {
    commit('setFullScreen', boolean);
  },
  fetchImages({ commit }) {
    return new Promise((resolve, reject) => {
      API.LIST.get('/list').then((res) => {
        const response = res.data;
        const images = [];

        if (response.length) {
          const processImages = async () => {
            // console.log('process images', response);

            for (const item in response) {
              const image = response[item];

              await API.IMAGE.get(`/${image.name}`).then((res) => {   
                const uint8Array = new Uint8Array(res.data);    
                const binary = uint8Array.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');    
                const data = window.btoa( binary );
                const src = `data:image/jpg;base64,${data}`;

                // console.log('proccessed', image.name);

                images.push({ 
                  name: image.name, 
                  src,               
                  width: image.resolution.width,
                  height: image.resolution.height
                });
              });
            }

            // console.log('all images processed', images);

            if (images.length) {
              commit('setImages', images);
              commit('setError', '');
            } else {
              commit('setImages', '');
              commit('setError', 'Images load failed');
            }

            resolve();
          };

          processImages();
        }
      }).catch((e) => {
        console.log('API has issues', e);

        reject();
      });
    });
  }
};

// mutations
const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setFullScreen(state, isFullScreen) {
    state.isFullScreen = isFullScreen;
  },
  setImages(state, images) {
    state.images = images;
  },
  setFavorites(state, images) {
    state.favorites = images;
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
