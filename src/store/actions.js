export default {
  addToList(context, payload) {
    const selectedStock = context.state.products.find(
      (stock) => stock.id === payload.id
    );

    const addedStock = {
      ...selectedStock,
      orders: ['test'],
    };

    context.commit('addToList', addedStock);
  },
  addOrder(context, { id, savedOrder }) {
    const index = context.state.currentCuttingList.findIndex(
      (stock) => stock.id === id
    );

    context.commit('addOrder', { index, savedOrder });
  },
  deleteItem(context, payload) {
    context.commit('deleteItem', payload);
  },
};
