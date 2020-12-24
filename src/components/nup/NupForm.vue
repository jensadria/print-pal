<template>
  <!-- Finished Size -->
  <div class="container">
    <div id="form">
      <form @submit.prevent="calculateNup">
        <div class="form-control">
          <label for="qty">Quantity</label><br />
          <input type="number" id="qty" v-model.number="qty" />
        </div>
        <div class="form-control dimensions">
          <div>
            <label for="width">Width in mm</label><br />
            <input type="number" id="width" v-model.number="width" />
          </div>
          <div class="x">x</div>
          <div>
            <label for="height">Height in mm</label><br />
            <input type="number" id="height" v-model.number="height" />
          </div>
        </div>
        <div class="form-control">
          <div>
            <label for="margins">Outside Margin</label><br />
            <input type="number" id="margins" v-model.number="margins" />
          </div>
          <div>
            <label for="gutters">Gutters</label><br />
            <input type="number" id="gutters" v-model.number="gutters" />
          </div>
        </div>

        <!-- Sheet Size -->
        <div class="form-control">
          <div>
            <label for="sheet-width">Sheet Width in mm</label><br />
            <input type="number" id="sheet-width" v-model.number="sheetWidth" />
          </div>
          <div class="x">x</div>
          <div>
            <label for="sheet-height">Height in mm</label><br />
            <input
              type="number"
              id="sheet-height"
              v-model.number="sheetHeight"
            />
          </div>
        </div>
        <button>Calculate</button>
        <button type="button" @click="switchOrientation">
          Switch Orientation
        </button>
      </form>
    </div>
    <div class="results">
      <div>Number out on Page :{{ result }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qty: 10,
      width: 90,
      height: 55,
      sheetWidth: 450,
      sheetHeight: 320,
      gutters: 5,
      margins: 5,
      result: 0,
      nUp1: null,
      nUp2: null,
      sizes: {},
    };
  },
  computed: {
    totalMargins() {
      return +(this.margins * 2);
    },
  },
  methods: {
    calculateNup() {
      // Calculate width divided by activeWidth & activeHeight
      const widthInWidth = Math.floor(
        (this.sheetWidth + this.gutters) / (this.width + this.gutters)
      );
      const widthInHeight = Math.floor(
        (this.sheetHeight + this.gutters) / (this.width + this.gutters)
      );

      // Calculate height divided by activeWidth & activeHeight
      const heightInWidth = Math.floor(
        (this.sheetWidth + this.gutters) / (this.height + this.gutters)
      );
      const heightInHeight = Math.floor(
        (this.sheetHeight + this.gutters) / (this.height + this.gutters)
      );

      //   Calculate nUps
      this.nUp1 = widthInWidth * heightInHeight;
      this.nUp2 = widthInHeight * heightInWidth;

      // Figure out which one fits more on a page
      const nUpOnPage = Math.max(this.nUp1, this.nUp2);

      this.result = nUpOnPage;

      console.log(this.nUp1, this.nUp2);
    },
    switchOrientation() {
      const otherOrientation = Math.min(this.nUp1, this.nUp2);
      this.result = otherOrientation;
    },
  },
};
</script>

<style scoped>
/* * {
  border: 1px dotted red;
} */
.container {
  display: flex;
  flex-direction: column;
}

.form-control {
  display: flex;
  width: 40vw;
  margin: 0.8rem;
}

input {
  border: 2px solid gray;
  border-radius: 0.5rem;
  font-size: 30px;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-radius: 0.5rem;
  outline: none;
}

#qty {
  width: 30%;
  text-align: center;
  margin-left: 1rem;
}

.x {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

#width,
#height,
#sheet-width,
#sheet-height,
#margins,
#gutters {
  width: 50%;
  text-align: center;
}

#margins,
#gutters {
  font-size: 18px;
}
</style>
