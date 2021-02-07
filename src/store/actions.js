export default {
  addToList(context, payload) {
    const selectedStock = context.state.products.find(
      (stock) => stock.id === payload.id
    );

    const addedStock = {
      ...selectedStock,
      packs: 0,
      bulks: 0,
      orders: [],
    };

    context.commit('addToList', addedStock);
  },
  selectedStockId(context, payload) {
    const selectedStockId = payload.id;

    context.commit('selectedStockId', selectedStockId);
  },
  editOrder(context, { productIndex, orderIndex, editedOrder }) {
    context.commit('editOrder', {
      productIndex,
      orderIndex,
      editedOrder,
    });
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
