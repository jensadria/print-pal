import { createRouter, createWebHistory } from 'vue-router';

import PriceCalc from './pages/PriceCalc.vue';
import NupCalc from './pages/NupCalc.vue';
import CuttingList from './pages/CuttingList.vue';
import CurrentList from './components/cuttinglist/CurrentList.vue';
import CompletedList from './components/cuttinglist/CompletedList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/nup' },
    { path: '/price', component: PriceCalc },
    { path: '/nup', component: NupCalc },
    {
      path: '/cuttinglist',
      component: CuttingList,
      children: [
        {
          path: '',
          component: CurrentList,
        },
        {
          path: 'completed',
          component: CompletedList,
        },
      ],
    },
  ],
});

export default router;
