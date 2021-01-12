export default {
  addToList(state, payload) {
    state.currentCuttingList.push(payload);
  },
  deleteItem(state, index) {
    state.currentCuttingList.slice(index, 1);
    console.log(state.currentCuttingList);
  },
};
