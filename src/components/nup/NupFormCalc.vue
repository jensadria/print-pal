<template>
  <!-- Finished Size -->
  <div class="container">
    <div class="row g-4 mt-2">
      <div class="col-md-5">
        <div class="card p-4 border-info h-100 bg-light">
          <div>
            <form>
              <div>
                <div class="row mb-3">
                  <div class="col col-lg-6">
                    <div class="input-group input-group-lg mb-2">
                      <span for="qty" class="input-group-text fw-bold"
                        >Qty</span
                      >
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        v-model.number="nUpInput.qty"
                      />
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <h4><span class="fw-bold">Unit Size</span> (in mm)</h4>
                </div>
                <div class="row row-cols-1 row-cols-xl-2 mb-3">
                  <div class="col">
                    <div class="input-group input-group-lg mb-2">
                      <span for="width" class="input-group-text fw-bold"
                        >Width</span
                      >
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        id="width"
                        min="0"
                        v-model.number="nUpInput.width"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-group input-group-lg mb-2">
                      <span
                        for="height"
                        class="input-group-text input-group-lg  fw-bold"
                        >Height</span
                      >
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        min="0"
                        v-model.number="nUpInput.height"
                      />
                    </div>
                  </div>
                </div>

                <!-- Gutters -->
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="input-group mb-2">
                      <span for="margins" class="input-group-text"
                        >Gutters</span
                      >
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        v-model.number="nUpInput.gutters"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <!-- Sheet Size -->
                <div class="row mt-4">
                  <h4><span class="fw-bold">Sheet Size</span> (in mm)</h4>
                </div>
                <div class="row row-cols-1 row-cols-xl-2 mb-3">
                  <div class="col">
                    <div class="input-group  input-group-lg  mb-2">
                      <span for="width" class="input-group-text fw-bold"
                        >Width</span
                      >
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        id="width"
                        min="0"
                        v-model.number="nUpInput.sheetWidth"
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-group  input-group-lg  mb-2">
                      <span for="height" class="input-group-text fw-bold"
                        >Height</span
                      >
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        min="0"
                        v-model.number="nUpInput.sheetHeight"
                      />
                    </div>
                  </div>
                </div>

                <!-- Margin -->
                <div class="row">
                  <div class="col col-lg-6">
                    <div class="input-group mb-2">
                      <span for="margins" class="input-group-text">Margin</span>
                      <input
                        type="number"
                        class="form-control"
                        min="0"
                        v-model.number="nUpInput.margins"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <!-- <base-button mode="blue-bg">Impose</base-button> -->
                <div
                  class="btn btn-primary btn-lg switch-button"
                  type="button"
                  mode="blue-bg"
                  @click="switchOrientation"
                >
                  Switch Orientation
                </div>
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

          <!-- RESULTS SECTION -->
          <div class="card my-4 p-4 shadow rounded bd-gray-500">
            <div class="h1 fw-bold">{{ result }} out of a page</div>
            <hr />
            <div class="h2">{{ requiredSheets }} sheets required</div>
            <div class="h2">{{ totalUnits }} units total</div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-4 border-info h-100">
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
              :viewBox="
                '0 0 ' + nUpInput.sheetWidth + ' ' + nUpInput.sheetHeight
              "
            >
              <rect
                width="100%"
                height="100%"
                fill="lightgray"
                id="sheetSizeSvg"
              />
            </svg>
          </div>
        </div>
      </div>
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
    requiredSheets() {
      return Math.ceil(this.nUpInput.qty / this.result);
    },
    result() {
      return this.nUpResult.nUp1;
    },
    totalUnits() {
      return this.nUpResult.nUp1 * this.requiredSheets;
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

.input-group-text.units {
  background-color: white;
}

@media print {
  .switch-button {
    display: none;
  }
}
</style>
