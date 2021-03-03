export default {
  async LOAD_PRODUCTS(context) {
    const data = await fetch(
      'https://print-pal.herokuapp.com/api/products/'
    ).then((response) => response.json());

    context.commit('LOAD_PRODUCTS', data);
  },
  async LOAD_ORDERS(context) {
    const data = await fetch(
      'https://print-pal.herokuapp.com/api/orders/'
    ).then((response) => response.json());

    context.commit('LOAD_ORDERS', data);
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
  //   markAllComplete(context, payload) {
  //     const data await fetch('put')

  //     context.commit('markAllComplete', payload);
  //   },
};
