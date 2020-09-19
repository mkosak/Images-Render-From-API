import Vue from 'vue';
import Vuex from 'vuex';
import API from './../api';

Vue.use(Vuex);

// initial state
const state = () => ({
  isLoading: false,
  images: [],
  favorites: [],
  isFullScreen: false,
  savedFullScreenImg: false,
  error: false
});

// getters
const getters = {
  isLoading: (state) => {
    return state.isLoading;
  },
  getImages: (state) => {
    return state.images;
  },
  getFavorites: (state) => {
    return state.favorites;
  },
  isFullScreen: (state) => {
    return state.isFullScreen;
  },
  getError: (state) => {
    return state.error;
  },
  getSavedFullScreenImg: (state) => {
    return state.savedFullScreenImg;
  }
};

// actions
const actions = {
  fetchImages({ commit }) {
    return new Promise((resolve) => {

      // fetch the default "list" endpoint for images list
      API.LIST.get('/list').then((res) => {
        const response = res.data;
        const images = [];

        if (response.length) {          
          const processImages = async () => {
            // go through the images
            for (const item in response) {
              const image = response[item];

              // since, there is no image url's we fetch the src data per image from the 'image' endpoint
              await API.IMAGE.get(`/${image.name}`).then((res) => {
                // load all the images and convert them to base64
                const uint8Array = new Uint8Array(res.data);    
                const binary = uint8Array.reduce((acc, i) => acc += String.fromCharCode.apply(null, [i]), '');    
                const data = window.btoa( binary );
                const src = `data:image/jpg;base64,${data}`;

                // collect ready images
                images.push({ 
                  name: image.name, 
                  src,               
                  width: image.resolution.width,
                  height: image.resolution.height,
                  favourite: image.favourite
                });
              });
            }

            if (images.length) {
              commit('setFavorites', images);
              commit('setImages', images);
              commit('setError', false);
            }

            resolve();
          };

          processImages();
        }
      }).catch((e) => {
        console.log('API has issues', e);

        commit('setLoading', false);
        commit('setError', true);
      });
    });
  }
};

// mutations
const mutations = {
  setLoading(state, boolean) {
    state.isLoading = boolean;
  },
  setFullScreen(state, boolean) {
    state.isFullScreen = boolean;
  },
  saveFullScreenImage(state, image) {
    state.savedFullScreenImg = image;
  },
  setImages(state, images) {
    state.images = images;
  },
  setFavorites(state, images) {
    images = images.filter(image => image.favourite);    
    state.favorites = images;
  },
  setError(state, boolean) {
    state.error = boolean;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
