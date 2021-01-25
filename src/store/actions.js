export default {
  addToList(context, payload) {
    const selectedStock = context.state.products.find(
      (stock) => stock.id === payload.id
    );

    const addedStock = {
      ...selectedStock,
      packs: 0,
      bulks: 0,
    };

    context.commit('addToList', addedStock);
  },
  deleteItem(context, payload) {
    context.commit('deleteItem', payload);
  },
};
