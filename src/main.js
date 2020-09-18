import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import VueMaterial from 'vue-material';
import VueCarousel from 'vue-carousel';

import App from './App.vue';
import CONFIG from './config';
import store from './store';

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

Vue.use(VueCarousel);
Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes: CONFIG.ROUTES,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
