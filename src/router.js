import { createRouter, createWebHistory } from 'vue-router';

import PriceCalc from './pages/PriceCalc.vue';
import NupCalc from './pages/NupCalc.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/nup' },
    { path: '/price', component: PriceCalc },
    { path: '/nup', component: NupCalc },
  ],
});

export default router;
