import Home from './components/Home.vue';
import Favorites from './components/Favorites.vue';
import ImagePage from './components/ImagePage.vue';

const CONFIG = Object.freeze({
  'API_URL': 'https://portal-tb.lynxx.co/api-test/image/',
  'ROUTES': [
    { path: '/', component: Home },
    { path: '/favorites', component: Favorites },
    { path: '/image/:id', component: ImagePage }
  ]
});

export default CONFIG;
