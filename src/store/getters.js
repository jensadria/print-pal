export default {
  getProducts(state) {
    return state.products;
  },
  getCurrentOrders(state) {
    return state.currentOrders;
  },
  getCurrentProducts(state) {
    const productIds = [
      ...new Set(state.currentOrders.map((order) => order.productId)),
    ];

    const productOrders = state.products.filter((product) =>
      productIds.includes(product.id)
    );

    return productOrders;
  },
};
