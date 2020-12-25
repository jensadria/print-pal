import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      nUpInput: {
        qty: 10,
        width: 90,
        height: 55,
        sheetWidth: 450,
        sheetHeight: 320,
        gutters: 5,
        margins: 5,
      },
      nUpResult: {
        result: 0,
        nUp1: null,
        nUp2: null,
      },
    };
  },
  getters,
  actions,
  mutations,
});

export default store;
