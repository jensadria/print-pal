const axios = require('axios');

export default {
  async LOAD_PRODUCTS(context) {
    await axios
      .get('https://print-pal.herokuapp.com/api/products/')
      .then((response) => context.commit('LOAD_PRODUCTS', response.data))
      .catch((error) => console.error(error));
  },
  async LOAD_ORDERS(context) {
    await axios
      .get('https://print-pal.herokuapp.com/api/orders/')
      .then((response) => context.commit('LOAD_ORDERS', response.data))
      .catch((error) => console.error(error));
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
  editOrder(context, payload) {
    context.commit('editOrder', payload);
  },
};
