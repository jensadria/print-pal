<template>
  <!-- Finished Size -->
  <div class="container">
    <div class="row">
      <base-card class="col">
        <div>
          <form v-on:submit.prevent="imposeOnSheet">
            <div>
              <div class="row mb-3">
                <div class="col-6">
                  <label for="qty" class="form-label">Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    v-model.number="nUpInput.qty"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="width" class="form-label">Width in mm</label>
                  <input
                    type="number"
                    class="form-control"
                    id="width"
                    min="0"
                    v-model.number="nUpInput.width"
                  />
                </div>
                <div class="col">
                  <label for="height" class="form-label">Height in mm</label>
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    v-model.number="nUpInput.height"
                  />
                </div>
              </div>

              <!-- Margins & Gutters -->
              <div>
                <label for="margins" class="form-label">Outside Margin</label>
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model.number="nUpInput.margins"
                />
              </div>
              <div>
                <label for="gutters" class="form-label">Gutters</label>
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model.number="nUpInput.gutters"
                />
              </div>

              <!-- Sheet Size -->
              <div>
                <label for="sheet-width" class="form-label"
                  >Sheet Width in mm</label
                >
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model.number="nUpInput.sheetWidth"
                />
              </div>
              <div>
                <label for="sheet-height" class="form-label"
                  >Sheet Height in mm</label
                >
                <input
                  type="number"
                  class="form-control"
                  min="0"
                  v-model.number="nUpInput.sheetHeight"
                />
              </div>
            </div>
            <div class="buttons">
              <!-- <base-button mode="blue-bg">Impose</base-button> -->
              <base-button
                type="button"
                mode="blue-bg"
                @click="switchOrientation"
              >
                Switch Orientation
              </base-button>
            </div>
            <p v-if="!allAreasFilled">
              The areas "Width", "Height", "Sheet Width" and "Sheet Height"
              cannot be 0
            </p>
            <p v-if="tooBigForSheet">
              The width or height is too big for the sheet
            </p>
          </form>
        </div>
        <div class="results">
          <div>{{ result }} out of a page</div>
          <div>{{ calculateSheets }} sheets required</div>
        </div>
      </base-card>
      <base-card class="col">
        <!-- <div id="svgContainer"></div> -->
        <div class="svg-wrapper">
          <svg
            id="svgContainer"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            style="max-height: 80vh"
            preserveAspectRatio="xMinYMin"
            :viewBox="'0 0 ' + nUpInput.sheetWidth + ' ' + nUpInput.sheetHeight"
          >
            <rect
              width="100%"
              height="100%"
              fill="lightgray"
              id="sheetSizeSvg"
            />
          </svg>
        </div>
      </base-card>
    </div>
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
        // nUp2: 0,
        sheetsAmount: 0,
      },
      allAreasFilled: true,
      tooBigForSheet: false,
      xmlns: 'http://www.w3.org/2000/svg',
    };
  },
  watch: {
    nUpInput: {
      handler: function() {
        this.imposeOnSheet();
      },
      deep: true,
    },
  },
  computed: {
    activeWidth() {
      return this.nUpInput.sheetWidth - 2 * this.nUpInput.margins;
    },
    activeHeight() {
      return this.nUpInput.sheetHeight - 2 * this.nUpInput.margins;
    },
    calculateSheets() {
      return Math.ceil(this.nUpInput.qty / this.result);
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
      this.validateFields();
      if (!this.allAreasFilled || this.tooBigForSheet) {
        return;
      }

      const { width, height, gutters } = this.nUpInput;

      // FIRST ORIENTATION
      const i = this.imposer(width, this.activeWidth, gutters);
      const j = this.imposer(height, this.activeHeight, gutters);
      this.nUpResult.timesAcrossWidth = i;
      this.nUpResult.timesAcrossLength = j;

      // SECOND ORIENTATION
      //   const m = this.imposer(height, this.activeWidth, gutters);
      //   const n = this.imposer(width, this.activeHeight, gutters);

      //   Calculate nUps
      this.nUpResult.nUp1 = i * j;
      //   this.nUpResult.nUp2 = m * n;

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
          svgContainer.appendChild(print);

          startingPointX = startingPointX + width + gutters;
        }
        startingPointX = centredMarginAlongWidth;
        startingPointY = startingPointY + height + gutters;
      }
    },
    switchOrientation() {
      this.validateFields();
      if (!this.allAreasFilled) {
        return;
      }

      let tmp = this.nUpInput.width;
      this.nUpInput.width = this.nUpInput.height;
      this.nUpInput.height = tmp;
      this.imposeOnSheet();
      this.drawOnSheet();
    },

    validateFields() {
      const { width, height, sheetWidth, sheetHeight, margins } = this.nUpInput;

      if (
        width === 0 ||
        height === 0 ||
        sheetWidth === 0 ||
        sheetHeight === 0
      ) {
        this.allAreasFilled = false;
      } else {
        this.allAreasFilled = true;
      }

      if (
        width > sheetWidth - 2 * margins ||
        height > sheetHeight - 2 * margins
      ) {
        this.tooBigForSheet = true;
      } else {
        this.tooBigForSheet = false;
      }
    },
  },
  mounted() {
    this.imposeOnSheet();
  },

  //   END OF EXPORT DEFAULT
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
</style>
