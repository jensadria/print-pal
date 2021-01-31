export default {
  addToList(state, payload) {
    state.currentCuttingList.push(payload);
  },

  addOrder(state, { index, savedOrder }) {
    state.currentCuttingList[index].orders.push(savedOrder);
  },

  deleteItem(state, index) {
    state.currentCuttingList.slice(index, 1);
    console.log(state.currentCuttingList);
  },
};
