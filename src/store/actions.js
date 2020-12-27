export default {
  imposeOnSheet(context) {
    const {
      width,
      height,
      margins,
      gutters,
      sheetWidth,
      sheetHeight,
    } = context.state.nUpInput;

    const activeWidth = sheetWidth - 2 * margins;
    const activeHeight = sheetHeight - 2 * margins;

    let startingPointX = 0;
    let startingPointY = 0;

    // FIRST ORIENTATION
    let i = 0;
    let j = 0;

    for (i; startingPointY + height < activeHeight; i++) {
      startingPointY = startingPointY + height + gutters;
    }
    for (j; startingPointX + width < activeWidth; j++) {
      startingPointX = startingPointX + width + gutters;
    }

    // SECOND ORIENTATION
    startingPointX = 0;
    startingPointY = 0;

    let m = 0;
    let n = 0;

    for (m; startingPointY + height < activeWidth; m++) {
      startingPointY = startingPointY + height + gutters;
    }
    for (n; startingPointX + width < activeHeight; n++) {
      startingPointX = startingPointX + width + gutters;
    }

    //   Calculate nUps
    const firstOption = i * j;
    const secondOption = m * n;

    // Figure out which one fits more on a page
    const mainOrientation = Math.max(firstOption, secondOption);
    const otherOrientation = Math.min(firstOption, secondOption);

    context.commit('changeResults', { mainOrientation, otherOrientation });
  },
  //   drawOnSheet(_, canvas) {
  //     const {
  //       width,
  //       height,
  //       margins,
  //       gutters,
  //       sheetHeight,
  //       sheetWidth,
  //     } = this.context.nUpInput;

  //     let startingPointX = margins;
  //     let startingPointY = margins;

  //     canvas.clearRect(0, 0, sheetWidth, sheetHeight);

  //     for (let i = 0; startingPointY < sheetHeight - height - margins; i++) {
  //       for (let j = 0; startingPointX < sheetWidth - width - margins; j++) {
  //         canvas.fillRect(startingPointX, startingPointY, width, height);
  //         startingPointX = startingPointX + width + gutters;
  //       }

  //       startingPointX = margins;
  //       startingPointY = startingPointY + height + gutters;
  //     }
  //   },
};
