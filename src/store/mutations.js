export default {
  addToList(state, payload) {
    state.currentCuttingList.push(payload);
  },

  addOrder(state, { index, savedOrder }) {
    state.currentCuttingList[index].orders.push(savedOrder);
  },
  editOrder(state, { productIndex, orderIndex, editedOrder }) {
    console.log(productIndex, orderIndex, editedOrder);

    // state.currentCuttingList[selectedStockIndex].orders[
    //   orderIndex
    // ] = editedOrder;
  },

  deleteItem(state, index) {
    state.currentCuttingList.slice(index, 1);
    console.log(state.currentCuttingList);
  },
};
