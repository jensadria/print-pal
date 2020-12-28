export default {
  changeResults(state, payload) {
    state.nUpResult.nUp1 = payload.firstOption;
    state.nUpResult.nUp2 = payload.secondOption;
  },
  switchOrientation(state) {
    let tmp = state.nUpInput.width;
    state.nUpInput.width = state.nUpInput.height;
    state.nUpInput.height = tmp;
  },
};
