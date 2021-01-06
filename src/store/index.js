import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      products: [
        {
          id: 'BLO004BLU01',
          name: 'Bloom A4 Card 270gsm Blush Pack 10',
          brand: 'Bloom',
          colour: 'Blush',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Pack',
          packQty: 10,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000BLU00',
          flatSheetStock: 606,
          parentCode: null,
          millPackSize: 100,
        },
        {
          id: 'BLO004BLU02',
          name: 'Bloom A4 Card 270gsm Blush Pack 50',
          brand: 'Bloom',
          colour: 'Blush',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Bulk',
          packQty: 50,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000BLU00',
          flatSheetStock: 606,
          parentCode: null,
          millPackSize: 100,
        },
        {
          id: 'BLO004CHI01',
          name: 'Bloom A4 Card 270gsm China Blue Pack 10',
          brand: 'Bloom',
          colour: 'China Blue',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Pack',
          packQty: 10,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000CHI00',
          flatSheetStock: 247,
          parentCode: null,
          millPackSize: 100,
        },
        {
          id: 'BLO004BLU02',
          name: 'Bloom A4 Card 270gsm China Blue Pack 50',
          brand: 'Bloom',
          colour: 'China Blue',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Bulk',
          packQty: 50,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000BLU00',
          flatSheetStock: 247,
          parentCode: null,
          millPackSize: 100,
        },
      ],
    };
  },
  getters,
  actions,
  mutations,
});

export default store;
