<template>
  <!-- Finished Size -->
  <div class="container">
    <base-card>
      <div class="calculations">
        <div id="form">
          <form v-on:submit.prevent="imposeOnSheet">
            <div class="form-input">
              <div class="form-quantity">
                <label for="qty">Quantity</label>
                <input
                  type="number"
                  id="qty"
                  min="0"
                  v-model.number="nUpInput.qty"
                />
              </div>
              <div class="form-width">
                <label for="width">Width in mm</label>
                <input
                  type="number"
                  id="width"
                  min="0"
                  v-model.number="nUpInput.width"
                />
              </div>
              <div class="form-height">
                <label for="height">Height in mm</label>
                <input
                  type="number"
                  id="height"
                  min="0"
                  v-model.number="nUpInput.height"
                />
              </div>

              <!-- Margins & Gutters -->
              <div class="form-margins">
                <label for="margins">Outside Margin</label>
                <input
                  type="number"
                  id="margins"
                  min="0"
                  v-model.number="nUpInput.margins"
                />
              </div>
              <div class="form-gutters">
                <label for="gutters">Gutters</label>
                <input
                  type="number"
                  id="gutters"
                  min="0"
                  v-model.number="nUpInput.gutters"
                />
              </div>

              <!-- Sheet Size -->
              <div class="form-sheet-width">
                <label for="sheet-width">Sheet Width in mm</label>
                <input
                  type="number"
                  id="sheet-width"
                  min="0"
                  v-model.number="nUpInput.sheetWidth"
                />
              </div>
              <div class="form-sheet-height">
                <label for="sheet-height">Sheet Height in mm</label>
                <input
                  type="number"
                  id="sheet-height"
                  min="0"
                  v-model.number="nUpInput.sheetHeight"
                />
              </div>
            </div>
            <div class="buttons">
              <base-button mode="blue-bg">Impose</base-button>
              <base-button type="button" @click="switchOrientation">
                Switch Orientation
              </base-button>
              <base-button type="button" @click="resetNumbers"
                >Reset</base-button
              >
            </div>
            <p v-if="!allAreasFilled">Please fill out all areas</p>
          </form>
        </div>
        <div class="results">
          <div>{{ result }} out of a page</div>
          <div>{{ calculateSheets }} sheets required</div>
        </div>
      </div>
    </base-card>
    <base-card>
      <!-- <div id="svgContainer"></div> -->
      <svg
        id="svgContainer"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="auto"
        height="auto"
        preserveAspectRatio="xMinYMin"
        :viewBox="'0 0 ' + nUpInput.sheetWidth + ' ' + nUpInput.sheetHeight"
      >
        <rect width="100%" height="100%" fill="lightgray" id="sheetSizeSvg" />
      </svg>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nUpInput: {
        qty: 10,
        width: 105,
        height: 148,
        sheetWidth: 450,
        sheetHeight: 320,
        gutters: 5,
        margins: 5,
      },
      nUpResult: {
        timesAcrossWidth: 0,
        timesAcrossLength: 0,
        nUp1: 0,
        nUp2: 0,
        sheetsAmount: 0,
      },
      allAreasFilled: true,
      calculatedButtonPressed: false,
      xmlns: 'http://www.w3.org/2000/svg',
    };
  },
  //   LINE BREAK
  computed: {
    activeWidth() {
      return this.nUpInput.sheetWidth - 2 * this.nUpInput.margins;
    },
    activeHeight() {
      return this.nUpInput.sheetHeight - 2 * this.nUpInput.margins;
    },
    calculateSheets() {
      if (!this.calculatedButtonPressed) {
        return 0;
      } else {
        return Math.ceil(this.nUpInput.qty / this.result);
      }
    },
    result() {
      return this.nUpResult.nUp1;
    },
  },
  methods: {
    imposer(length, sheetLength, gutter) {
      let startingPoint = 0;
      let i = 0;
      for (i; startingPoint + length <= sheetLength; i++) {
        startingPoint = startingPoint + gutter + length;
      }
      return i;
    },
    imposeOnSheet() {
      this.checkFields();
      if (!this.allAreasFilled) {
        return;
      }

      this.calculatedButtonPressed = true;
      const { width, height, gutters } = this.nUpInput;

      // FIRST ORIENTATION
      const i = this.imposer(width, this.activeWidth, gutters);
      const j = this.imposer(height, this.activeHeight, gutters);
      this.nUpResult.timesAcrossWidth = i;
      this.nUpResult.timesAcrossLength = j;

      // SECOND ORIENTATION
      const m = this.imposer(height, this.activeWidth, gutters);
      const n = this.imposer(width, this.activeHeight, gutters);

      //   Calculate nUps
      this.nUpResult.nUp1 = i * j;
      this.nUpResult.nUp2 = m * n;

      this.drawOnSheet();
    },
    drawSheetOnSvg() {
      const svgContainer = document.getElementById('svgContainer');
      svgContainer.textContent = '';

      const sheetSize = document.createElementNS(this.xmlns, 'rect');
      sheetSize.setAttributeNS(null, 'width', '100%');
      sheetSize.setAttributeNS(null, 'height', '100%');
      sheetSize.setAttributeNS(null, 'fill', 'lightgrey');
      svgContainer.appendChild(sheetSize);

      const activeSheetSize = document.createElementNS(this.xmlns, 'rect');
      activeSheetSize.setAttributeNS(null, 'width', this.activeWidth);
      activeSheetSize.setAttributeNS(null, 'height', this.activeHeight);
      activeSheetSize.setAttributeNS(null, 'fill', 'grey');
      activeSheetSize.setAttributeNS(null, 'x', this.nUpInput.margins);
      activeSheetSize.setAttributeNS(null, 'y', this.nUpInput.margins);
      svgContainer.appendChild(activeSheetSize);
    },
    drawOnSheet() {
      const { width, height, gutters, sheetWidth, sheetHeight } = this.nUpInput;

      this.drawSheetOnSvg();
      const svgContainer = document.getElementById('svgContainer');

      // Add gradient defs
      let defs = document.createElementNS(this.xmlns, 'defs');
      let grad = document.createElementNS(this.xmlns, 'linearGradient');
      grad.setAttributeNS(null, 'id', 'gradient');
      grad.setAttributeNS(null, 'x1', '0%');
      grad.setAttributeNS(null, 'x2', '50%');
      grad.setAttributeNS(null, 'y1', '100%');
      grad.setAttributeNS(null, 'y2', '0%');

      let stopTop = document.createElementNS(this.xmlns, 'stop');
      stopTop.setAttributeNS(null, 'offset', '0%');
      stopTop.setAttributeNS(null, 'stop-color', '#3674a7');

      let stopBottom = document.createElementNS(this.xmlns, 'stop');
      stopBottom.setAttributeNS(null, 'offset', '100%');
      stopBottom.setAttributeNS(null, 'stop-color', '#b3d7f5');

      grad.appendChild(stopTop);
      grad.appendChild(stopBottom);
      defs.appendChild(grad);
      svgContainer.prepend(defs);

      // Calculate margin for centering
      const i = this.imposer(width, this.activeWidth, gutters);
      const j = this.imposer(height, this.activeHeight, gutters);
      const centredMarginAlongWidth =
        (sheetWidth - i * width - (i - 1) * gutters) / 2;
      const centredMarginAlongHeight =
        (sheetHeight - j * height - (j - 1) * gutters) / 2;

      let startingPointX = centredMarginAlongWidth;
      let startingPointY = centredMarginAlongHeight;

      // Draw Prints on SVG
      for (let x = 0; x < j; x++) {
        for (let y = 0; y < i; y++) {
          const print = document.createElementNS(this.xmlns, 'rect');
          print.setAttributeNS(null, 'width', width);
          print.setAttributeNS(null, 'height', height);
          print.setAttributeNS(null, 'x', startingPointX);
          print.setAttributeNS(null, 'y', startingPointY);
          print.setAttributeNS(null, 'fill', 'url(#gradient');
          //   print.setAttributeNS(null, 'id', '#print-rect');
          svgContainer.appendChild(print);

          startingPointX = startingPointX + width + gutters;
        }
        startingPointX = centredMarginAlongWidth;
        startingPointY = startingPointY + height + gutters;
      }
    },
    switchOrientation() {
      this.checkFields();
      if (!this.allAreasFilled) {
        return;
      }

      let tmp = this.nUpInput.width;
      this.nUpInput.width = this.nUpInput.height;
      this.nUpInput.height = tmp;
      this.imposeOnSheet();
      this.drawOnSheet();
    },
    resetNumbers() {
      const svgContainer = document.getElementById('svgContainer');
      svgContainer.textContent = '';

      for (let key in this.nUpInput) {
        this.nUpInput[key] = 0;
      }
      this.nUpInput.sheetWidth = 450;
      this.nUpInput.sheetHeight = 320;
    },
    checkFields() {
      if (
        this.nUpInput.qty === 0 ||
        this.nUpInput.width === 0 ||
        this.nUpInput.height === 0 ||
        this.nUpInput.sheetWidth === 0 ||
        this.nUpInput.sheetHeight === 0
      ) {
        this.allAreasFilled = false;
      } else {
        this.allAreasFilled = true;
      }
    },
  },

  //   END OF EXPORT DEFAULT
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
.container {
  display: flex;
  /* flex-wrap: wrap; */
}

.container > div:first-child {
  flex: 1;
}

.container > div:nth-child(2) {
  flex: 2;
}

.calculations {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-input {
  width: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  grid-template-rows: auto;
  grid-template-areas:
    'qty . '
    'width height '
    'margins .'
    'gutters .'
    'sheet-width sheet-height';
}

.form-quantity {
  grid-area: qty;
}
.form-width {
  grid-area: width;
}
.form-height {
  grid-area: height;
}
.form-margins {
  grid-area: margins;
}
.form-gutters {
  grid-area: gutters;
}
.form-sheet-width {
  grid-area: sheet-width;
}
.form-sheet-height {
  grid-area: sheet-height;
}

input,
label {
  display: block;
  text-align: left;
  padding: 0.5px;
}

input {
  display: block;
  border: 2px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  font-size: 30px;
  font-weight: medium;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: var(--very-light-blue);
  outline: none;
}

#sheet-width,
#sheet-height,
#margins,
#gutters,
#qty,
#width,
#height {
  width: 100%;
  text-align: left;
}

#qty,
#width,
#height {
  font-size: 50px;
  height: 70px;
}

#margins,
#gutters {
  font-size: 18px;
}

.results {
  width: 100%;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background: var(--very-light-blue);
  margin: 20px;
  border-radius: 1rem;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
  margin-top: 30px;
}

.canvas-container {
  max-height: 100%;
  display: flex;
  min-width: 500px;
  max-height: 700px;
  max-width: auto;
}

#nup-canvas {
  /* border: 1px solid red; */
  background-color: var(--cool-gray);
  /* position: relative; */
  width: 100%;

  height: auto;
}
</style>
