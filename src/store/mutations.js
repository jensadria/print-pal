export default {
  changeResults(state, payload) {
    state.nUpResult.nUp1 = payload.mainOrientation;
    state.nUpResult.nUp2 = payload.otherOrientation;
  },
};
