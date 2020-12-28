<template>
  <!-- Finished Size -->
  <div class="container">
    <base-card>
      <div id="form">
        <form @submit.prevent="imposeOnSheet">
          <div class="form-control">
            <div>
              <label for="qty">Quantity</label>
              <input type="number" id="qty" v-model.number="nUpInput.qty" />
            </div>
          </div>
          <div class="form-control">
            <div>
              <label for="width">Width in mm</label>
              <input type="number" id="width" v-model.number="nUpInput.width" />
            </div>
            <div class="x">X</div>
            <div>
              <label for="height">Height in mm</label>
              <input
                type="number"
                id="height"
                v-model.number="nUpInput.height"
              />
            </div>
          </div>

          <!-- Margins & Gutters -->
          <div class="form-control">
            <div>
              <label for="margins">Outside Margin</label>
              <input
                type="number"
                id="margins"
                v-model.number="nUpInput.margins"
              />
            </div>
          </div>
          <div class="form-control">
            <div>
              <label for="gutters">Gutters</label>
              <input
                type="number"
                id="gutters"
                v-model.number="nUpInput.gutters"
              />
            </div>
          </div>

          <!-- Sheet Size -->
          <div class="form-control">
            <div>
              <label for="sheet-width">Sheet Width in mm</label>
              <input
                type="number"
                id="sheet-width"
                v-model.number="nUpInput.sheetWidth"
              />
            </div>
            <div class="x">X</div>
            <div>
              <label for="sheet-height">Height in mm</label>
              <input
                type="number"
                id="sheet-height"
                v-model.number="nUpInput.sheetHeight"
              />
            </div>
          </div>
          <div class="buttons">
            <button>Impose</button>
            <button type="button" @click="switchOrientation">
              Switch Orientation
            </button>
            <button type="button" @click="resetNumbers">Reset</button>
          </div>
        </form>
      </div>
      <div class="results">
        <div>Maximum number out on Page :{{ result }}</div>
        <div>Sheets Required: {{ calculateSheets }}</div>
      </div>
    </base-card>

    <base-card>
      <div class="canvas-container">
        <canvas
          id="nup-canvas"
          :width="nUpInput.sheetWidth"
          :height="nUpInput.sheetHeight"
        ></canvas>
        <button @click="drawOnSheet">Test</button>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  mounted() {
    const c = document.getElementById('nup-canvas');
    const ctx = c.getContext('2d');
    this.vueCanvas = ctx;

    // this.drawOnSheet();
  },
  //   LINE BREAK
  data() {
    return {
      nUpInput: {
        qty: 10,
        width: 55,
        height: 90,
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
      // mostOut: true,
      calculatedButtonPressed: false,
      vueCanvas: null,
    };
  },
  //   LINE BREAK
  computed: {
    calculateSheets() {
      if (!this.calculatedButtonPressed) {
        return 0;
      } else {
        return Math.ceil(this.$store.state.nUpInput.qty / this.result);
      }
    },
    result() {
      return this.nUpResult.nUp1;
    },
  },
  //   LINE BREAK
  methods: {
    imposeOnSheet() {
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
      this.nUpResult.nUp1 = i * j;
      this.nUpResult.nUp2 = m * n;

      this.drawOnSheet();
    },
    drawOnSheet() {
      const {
        width,
        height,
        margins,
        gutters,
        sheetWidth,
        sheetHeight,
      } = this.nUpInput;

      let startingPointX = margins;
      let startingPointY = margins;

      this.vueCanvas.clearRect(0, 0, sheetWidth, sheetHeight);

      for (let i = 0; startingPointY < sheetHeight - height - margins; i++) {
        for (let j = 0; startingPointX < sheetWidth - width - margins; j++) {
          this.vueCanvas.fillRect(
            startingPointX,
            startingPointY,
            width,
            height
          );
          startingPointX = startingPointX + width + gutters;
        }

        startingPointX = margins;
        startingPointY = startingPointY + height + gutters;
      }
    },
    switchOrientation() {
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
  justify-content: space-evenly;
}

.form-control {
  display: flex;
  margin: 0.8rem;
}

input,
label {
  /* width: 100px; */
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

#qty,
#width,
#height {
  font-size: 50px;
  width: 30%;
  height: 70px;

  /* margin-left: 1rem; */
}

.x {
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
}

#width,
#height,
#sheet-width,
#sheet-height,
#margins,
#gutters {
  width: 50%;
  text-align: left;
}

#margins,
#gutters {
  font-size: 18px;
}

.results {
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons button {
  margin: 0.5rem;
  width: 40%;
  height: 3rem;
}

.canvas-container {
  width: 100%;
  height: 100%;
  display: inline-block;
}

#nup-canvas {
  border: 1px solid red;
  /* position: relative; */
  width: 100%;
  height: auto;
}
</style>
