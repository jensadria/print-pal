export default {
  LOAD_PRODUCTS(state, payload) {
    state.products = [...payload];
  },
  LOAD_ORDERS(state, payload) {
    state.currentOrders = [...payload];
  },
  selectedStock(state, payload) {
    state.selectedStock = payload;
  },
  addOrder(state, savedOrder) {
    state.currentOrders.push(savedOrder);
  },
};
