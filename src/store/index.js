import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      products: [
        {
          id: 'BLO004BLU',
          name: 'Bloom A4 Card 270gsm Blush',
          brand: 'Bloom',
          colour: 'Blush',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Pack',
          packQty: 10,
          bulkQty: 50,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000BLU00',
          flatSheetStock: 606,
          parentCode: null,
          millPackSize: 100,
        },
        {
          id: 'BLO004CHI',
          name: 'Bloom A4 Card 270gsm China Blue',
          brand: 'Bloom',
          colour: 'China Blue',
          gsm: 270,
          noOutFlatSheet: 9,
          packType: 'Bulk',
          packQty: 10,
          bulkQty: 50,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BLO000BLU00',
          flatSheetStock: 247,
          parentCode: null,
          millPackSize: 100,
        },
        {
          id: 'BOS004CLA',
          name: 'Boston A4 Card 350gsm Classic White',
          brand: 'Boston',
          colour: 'Classic White',
          gsm: 350,
          noOutFlatSheet: 9,
          packType: 'Bulk',
          packQty: 20,
          bulkQty: 100,
          stock: 999999,
          discontinued: false,
          flatSheetCode: 'BOS002CLA00',
          flatSheetStock: 438,
          parentCode: null,
          millPackSize: 125,
        },
      ],
      currentCuttingList: [],
    };
  },
  getters,
  actions,
  mutations,
});

export default store;
