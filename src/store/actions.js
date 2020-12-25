export default {
  calculateNup(context) {
    const { nUpInput } = context.state;
    const allMargins = nUpInput.margins * 2;

    const activeWidth = nUpInput.sheetWidth - allMargins;
    const activeHeight = nUpInput.sheetHeight - allMargins;

    // Calculate width divided by activeWidth & activeHeight
    const widthInWidth = Math.floor(
      (activeWidth + nUpInput.gutters) / (nUpInput.width + nUpInput.gutters)
    );
    const widthInHeight = Math.floor(
      (activeHeight + nUpInput.gutters) / (nUpInput.width + nUpInput.gutters)
    );

    // Calculate height divided by activeWidth & activeHeight
    const heightInWidth = Math.floor(
      (activeWidth + nUpInput.gutters) / (nUpInput.height + nUpInput.gutters)
    );
    const heightInHeight = Math.floor(
      (activeHeight + nUpInput.gutters) / (nUpInput.height + nUpInput.gutters)
    );

    //   Calculate nUps
    const firstOption = widthInWidth * heightInHeight;
    const secondOption = widthInHeight * heightInWidth;

    // Figure out which one fits more on a page
    const mainOrientation = Math.max(firstOption, secondOption);
    const otherOrientation = Math.min(firstOption, secondOption);

    context.commit('changeResults', { mainOrientation, otherOrientation });
  },
};
