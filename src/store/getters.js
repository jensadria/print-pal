export default {
  getProducts(state) {
    return state.products;
  },
  getCurrentOrders(state) {
    console.log(state.currentOrders);
    return state.currentOrders.filter((order) => order.completed === false);
  },
  getCurrentProducts(_, { getProducts, getCurrentOrders }) {
    const productIds = [
      ...new Set(getCurrentOrders.map((order) => order.productId)),
    ];
    const productOrders = getProducts.filter((product) =>
      productIds.includes(product.id)
    );

    return productOrders;
  },
  getSelectedStock(state) {
    return state.selectedStock;
  },
};
