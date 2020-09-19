import Home from './components/Home.vue';
import Favorites from './components/Favorites.vue';
import ImagePage from './components/ImagePage.vue';

const CONFIG = Object.freeze({
  'API_URL': 'https://portal-tb.lynxx.co/api-test/image/',
  'ROUTES': [
    { path: '/', component: Home },
    { path: '/favorite', component: Favorites },
    { path: '/image/:id', component: ImagePage, query: { image: {} } }
  ]
});

export default CONFIG;
