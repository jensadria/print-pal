export default {
  addToList(context, payload) {
    const selectedStock = context.state.products.find(
      (stock) => stock.id === payload.id
    );

    const addedStock = {
      ...selectedStock,
      packs: payload.packs,
      bulks: payload.bulks,
    };

    context.commit('addToList', addedStock);
  },
};
