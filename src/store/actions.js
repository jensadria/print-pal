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
  async addOrderToDb(_, payload) {
    await axios
      .post('https://print-pal.herokuapp.com/api/orders/', payload)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
  async editOrder(_, { orderId, savedOrder }) {
    await axios
      .put(`https://print-pal.herokuapp.com/api/orders/${orderId}`, savedOrder)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
};
