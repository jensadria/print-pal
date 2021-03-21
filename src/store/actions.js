const axios = require('axios');

export default {
  async LOAD_PRODUCTS(context) {
    await axios
      .get(`${process.env.VUE_APP_SERVER_URI}/api/products/`)
      .then((response) => context.commit('LOAD_PRODUCTS', response.data))
      .catch((error) => console.error(error));
  },
  async LOAD_ORDERS(context) {
    await axios
      .get(`${process.env.VUE_APP_SERVER_URI}/api/orders/`)
      .then((response) => context.commit('LOAD_ORDERS', response.data))
      .catch((error) => console.error(error));
  },
  async addOrderToDb(_, payload) {
    await axios
      .post(`${process.env.VUE_APP_SERVER_URI}/api/orders/`, payload)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
  async editOrder(_, { orderId, savedOrder }) {
    await axios
      .patch(
        `${process.env.VUE_APP_SERVER_URI}/api/orders/${orderId}`,
        savedOrder
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
  deleteOrder(_, orderId) {
    return axios
      .delete(`${process.env.VUE_APP_SERVER_URI}/api/orders/${orderId}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
};
