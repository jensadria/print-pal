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
                <input type="number" id="qty" v-model.number="nUpInput.qty" />
              </div>
              <div class="form-width">
                <label for="width">Width in mm</label>
                <input
                  type="number"
                  id="width"
                  v-model.number="nUpInput.width"
                />
              </div>
              <div class="form-height">
                <label for="height">Height in mm</label>
                <input
                  type="number"
                  id="height"
                  v-model.number="nUpInput.height"
                />
              </div>

              <!-- Margins & Gutters -->
              <div class="form-margins">
                <label for="margins">Outside Margin</label>
                <input
                  type="number"
                  id="margins"
                  v-model.number="nUpInput.margins"
                />
              </div>
              <div class="form-gutters">
                <label for="gutters">Gutters</label>
                <input
                  type="number"
                  id="gutters"
                  v-model.number="nUpInput.gutters"
                />
              </div>

              <!-- Sheet Size -->
              <div class="form-sheet-width">
                <label for="sheet-width">Sheet Width in mm</label>
                <input
                  type="number"
                  id="sheet-width"
                  v-model.number="nUpInput.sheetWidth"
                />
              </div>
              <div class="form-sheet-height">
                <label for="sheet-height">Sheet Height in mm</label>
                <input
                  type="number"
                  id="sheet-height"
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
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        :width="nUpInput.sheetWidth"
        :height="nUpInput.sheetHeight"
        preserveAspectRatio="xMinYMin"
      >
        <rect width="100%" height="100%" fill="grey" id="sheetSizeSvg" />
        <rect
          :width="nUpInput.width"
          :height="nUpInput.height"
          fill="blue"
        ></rect>
        <!-- 
        <rect x="5" y="5" width="105" height="148" fill="orange" />
        <rect x="115" y="5" width="105" height="148" fill="orange" /> -->
      </svg>
      <!-- <svg
        viewBox="0 0 450 320"
        preserveAspectRatio="xMinYMin"
        width="450"
        height="320"
      >
        <rect width="100%" height="100%" fill="red"></rect>
        <rect width="105" height="148" fill="blue"></rect>
      </svg> -->
    </base-card>
  </div>
</template>

<script type="x/template">
export default {
  //   mounted() {
  //     const c = document.getElementById('nup-canvas');
  //     const ctx = c.getContext('2d');
  //     this.vueCanvas = ctx;

  //     // this.drawOnSheet();
  //   },
  //   LINE BREAK
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
        nUp1: 0,
        nUp2: 0,
        sheetsAmount: 0,
      },
      allAreasFilled: true,
      calculatedButtonPressed: false,
    };
  },
  //   LINE BREAK
  computed: {

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
  //   LINE BREAK
  methods: {
    imposeOnSheet() {
      this.checkFields();
      if (!this.allAreasFilled) {
        return;
      }

      this.calculatedButtonPressed = true;
      const {
        width,
        height,
        margins,
        gutters,
        sheetWidth,
        sheetHeight,
      } = this.nUpInput;

      const activeWidth = sheetWidth - 2 * margins;
      const activeHeight = sheetHeight - 2 * margins;

      let startingPointX = 0;
      let startingPointY = 0;

      // FIRST ORIENTATION
      let i = 0;
      let j = 0;

      for (i; startingPointY + height <= activeHeight + gutters; i++) {
        startingPointY = startingPointY + height + gutters;
      }
      for (j; startingPointX + width <= activeWidth + gutters; j++) {
        startingPointX = startingPointX + width + gutters;
      }

      // SECOND ORIENTATION
      startingPointX = 0;
      startingPointY = 0;

      let m = 0;
      let n = 0;

      for (m; startingPointY + height <= activeWidth + gutters; m++) {
        startingPointY = startingPointY + height + gutters;
      }
      for (n; startingPointX + width <= activeHeight + gutters; n++) {
        startingPointX = startingPointX + width + gutters;
      }

      //   Calculate nUps
      this.nUpResult.nUp1 = i * j;
      this.nUpResult.nUp2 = m * n;

      this.drawOnSheet();
    },
    drawOnSheet() {
        //   let svgEl = document.createElementNS(xmlns, 'svg');
      //   svgEl.setAttributeNS(null, 'viewBox', `0 0 ${sheetWidth} ${sheetHeight}`);
      //   svgEl.setAttributeNS(null, 'preserveAspectRatio', 'xMinYMin');
      //   svgEl.setAttributeNS(null, 'width', sheetWidth);
      //   svgEl.setAttributeNS(null, 'height', sheetHeight);
        // const xmlns = 'http://www.w3.org/2000/svg';

      const {
        width,
        height,
        margins,
        gutters,
        sheetWidth,
        sheetHeight,
      } = this.nUpInput;

      const svgEl = document.getElementById('sheetSizeSvg');
    //   svgEl.textContent = '';

      const print = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      print.setAttributeNS(null, 'width', width);
      print.setAttributeNS(null, 'height', height);
      print.setAttributeNS(null, 'fill', 'blue');
      svgEl.appendChild(print);

      //   const activeWidth = sheetWidth - 2 * margins;
      //   const activeHeight = sheetHeight - 2 * margins;

      let startingPointX = margins;
      let startingPointY = margins;

      for (let i = 0; startingPointY < sheetHeight - height + gutters; i++) {
        for (let j = 0; startingPointX < sheetWidth - width + gutters; j++) {
          //   this.vueCanvas.fillStyle = 'gray';
          //   let grd = this.vueCanvas.createLinearGradient(0, 0, 1, 1);
          //   grd.addColorStop(0, 'black');
          //   grd.addColorStop(1, 'white');

          //   this.vueCanvas.fillStyle = `rgb(150, 150, 150)`;
          //   this.vueCanvas.strokeStyle = `rgb(50, 50, 50)`;
          //   this.vueCanvas.lineWidth = 0.5;
          //   this.vueCanvas.strokeRect(
          //     startingPointX,
          //     startingPointY,
          //     width,
          //     height
          //   );
          //   this.vueCanvas.fillRect(
          //     startingPointX,
          //     startingPointY,
          //     width,
          //     height
          //   );

          startingPointX = startingPointX + width + gutters;
        }

        startingPointX = margins;
        startingPointY = startingPointY + height + gutters;
      }

      //   sheetSize.appendChild(svgEl);
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
