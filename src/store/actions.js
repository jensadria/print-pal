export default {
  async LOAD_PRODUCTS(context) {
    const data = await fetch(
      'http://localhost:3000/api/products/'
    ).then((response) => response.json());

    context.commit('LOAD_PRODUCTS', await data);
  },
  async LOAD_ORDERS(context) {
    const data = fetch('http://localhost:3000/api/orders/').then((response) =>
      response.json()
    );

    context.commit('LOAD_ORDERS', await data);
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
