import { createRouter, createWebHistory } from 'vue-router';

import NupCalc from './pages/NupCalc.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/nup' },
    { path: '/nup', component: NupCalc },
  ],
});

export default router;
