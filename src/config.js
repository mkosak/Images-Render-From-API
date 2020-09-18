import Home from './components/Home.vue';
import Results from './components/Results.vue';

const CONFIG = Object.freeze({
  'API_URL': 'http://www.omdbapi.com/',
  'API_KEY': 'e656bd4b',
  'ROUTES': [
    { path: '/', component: Home },
    { path: '/results', component: Results }
  ]
});

export default CONFIG;
