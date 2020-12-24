import { createStore } from 'vuex';

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
  getters: {
    loadInputData(state) {
      return state.nUpInput;
    },
    loadResults(state) {
      return state.nUpResult;
    },
  },
});

export default store;
