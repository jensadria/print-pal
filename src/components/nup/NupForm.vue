<template>
  <!-- Finished Size -->
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

    <!-- Sheet Size -->
    <div class="form-control sheet-dimensions">
      <div>
        <label for="sheet-width">Sheet Width in mm</label><br />
        <input type="number" id="sheet-width" v-model.number="sheetWidth" />
      </div>
      <div class="x">x</div>
      <div>
        <label for="sheet-height">Height in mm</label><br />
        <input type="number" id="sheet-height" v-model.number="sheetHeight" />
      </div>
    </div>
    <button type="submit">Submit</button>
    <div>{{ result }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      qty: 10,
      width: 210,
      height: 148,
      sheetWidth: 450,
      sheetHeight: 320,
      gutters: 0,
      margins: 0,
      result: 0,
    };
  },
  computed: {
    totalMargins() {
      return +(this.margins * 2);
    },
    activeGutters() {
      return +((this.qty - 1) * this.gutters);
    },
    activeWidth() {
      return +(this.sheetWidth - this.totalMargins - this.activeGutters);
    },
    activeHeight() {
      return +(this.sheetHeight - this.totalMargins - this.activeGutters);
    },
  },
  methods: {
    calculateNup() {
      // Calculate width divided by activeWidth & activeHeight
      const widthInWidth = Math.floor(this.activeWidth / this.width);
      const widthInHeight = Math.floor(this.activeHeight / this.width);

      // Calculate height divided by activeWidth & activeHeight
      const heightInWidth = Math.floor(this.activeWidth / this.height);
      const heightInHeight = Math.floor(this.activeHeight / this.height);

      //   Calculate nUps
      const nUp1 = widthInWidth * heightInHeight;
      const nUp2 = widthInHeight * heightInWidth;

      // Figure out which one fits more on a page
      const nUpOnPage = Math.max(nUp1, nUp2);

      this.result = nUpOnPage;

      console.log(nUpOnPage);
    },
  },
};
</script>

<style scoped>
/* * {
  border: 1px dotted red;
} */

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
#sheet-height {
  width: 50%;
  text-align: center;
}
</style>
