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
      .catch((error) => console.error(error));
  },
  async deleteOrder(_, orderId) {
    await axios
      .delete(`${process.env.VUE_APP_SERVER_URI}/api/orders/${orderId}`)
      .catch((error) => console.error(error));
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
  async toggleOrderStatus(_, { orderStage, orderId }) {
    console.log(orderStage);
    await axios
      .patch(
        `${process.env.VUE_APP_SERVER_URI}/api/orders/${orderStage}/${orderId}`
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  },
};
