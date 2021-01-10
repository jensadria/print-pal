export default {
  addToList(context, payload) {
    const selectedStock = context.state.products.find(
      (stock) => stock.id === payload
    );

    context.commit('addToList', selectedStock);
  },
};
