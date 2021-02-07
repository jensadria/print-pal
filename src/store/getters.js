export default {
  getProducts(state) {
    return state.products;
  },
  getCurrentOrders(state) {
    return state.currentOrders.filter((order) => order.completed === false);
  },
  getCurrentProducts(state) {
    const productIds = [
      ...new Set(
        state.currentOrders
          .filter((order) => order.completed === false)
          .map((order) => order.productId)
      ),
    ];

    const productOrders = state.products.filter((product) =>
      productIds.includes(product.id)
    );

    return productOrders;
  },
  getSelectedStock(state) {
    return state.selectedStock;
  },
};
