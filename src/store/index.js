import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      nUpInput: {
        qty: 10,
        width: 55,
        height: 90,
        sheetWidth: 450,
        sheetHeight: 320,
        gutters: 5,
        margins: 5,
      },
      nUpResult: {
        // nUp1 is the most amount that can fit on a sheet using only one orientation
        nUp1: 0,
        // nUp1 is the least amount that can fit on a sheet using only one orientation
        nUp2: 0,
        sheetsAmount: 0,
      },
      // vueCanvas: null,
    };
  },
  getters,
  actions,
  mutations,
});

export default store;
