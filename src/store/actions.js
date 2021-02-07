export default {
  loadProducts(context) {
    fetch('http://localhost.com/3000/api/products/')
      .then((response) => response.json())
      .then((data) => context.commit('loadProducts', data));
  },
  loadOrders(context) {
    fetch('http://localhost.com/3000/api/orders/')
      .then((response) => response.json())
      .then((data) => context.commit('loadProducts', data));
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
  editOrder(context, payload) {
    context.commit('editOrder', payload);
  },
  addOrder(context, payload) {
    context.commit('addOrder', payload);
  },
  deleteItem(context, payload) {
    context.commit('deleteItem', payload);
  },
};
