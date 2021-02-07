import Vue from 'vue';

export default {
  loadProducts(state, payload) {
    state.products = payload;
  },
  selectedStock(state, payload) {
    state.selectedStock = payload;
  },
  addOrder(state, savedOrder) {
    state.currentOrders.push(savedOrder);
  },
  editOrder(state, payload) {
    const indexOfOrder = state.currentOrders.indexOf(
      (order) =>
        order.productId === payload.productId &&
        order.petNumber === payload.petNumber
    );

    Vue.set(state.currentOrders, indexOfOrder, payload);
  },

  deleteItem(state, index) {
    state.currentCuttingList.slice(index, 1);
    console.log(state.currentCuttingList);
  },
};
