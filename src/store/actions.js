export default {
  calculateNup(context) {
    const { nUpInput, nUpResult } = context.state;

    // Calculate width divided by activeWidth & activeHeight
    const widthInWidth = Math.floor(
      (nUpInput.sheetWidth + nUpInput.gutters) /
        (nUpInput.width + nUpInput.gutters)
    );
    const widthInHeight = Math.floor(
      (nUpInput.sheetHeight + nUpInput.gutters) /
        (nUpInput.width + nUpInput.gutters)
    );

    // Calculate height divided by activeWidth & activeHeight
    const heightInWidth = Math.floor(
      (nUpInput.sheetWidth + nUpInput.gutters) /
        (nUpInput.height + nUpInput.gutters)
    );
    const heightInHeight = Math.floor(
      (nUpInput.sheetHeight + nUpInput.gutters) /
        (nUpInput.height + nUpInput.gutters)
    );

    //   Calculate nUps
    nUpResult.nUp1 = widthInWidth * heightInHeight;
    nUpResult.nUp2 = widthInHeight * heightInWidth;

    // Figure out which one fits more on a page
    const nUpOnPage = Math.max(nUpResult.nUp1, nUpResult.nUp2);

    nUpResult.result = nUpOnPage;

    context.commit('changeResults', nUpResult.result);
  },
  switchOrientation(context) {
    const { nUpResult } = context.state;

    const otherOrientation = Math.min(nUpResult.nUp1, nUpResult.nUp2);
    nUpResult.result = otherOrientation;

    context.commit('switchOrientation', otherOrientation);
  },
};
