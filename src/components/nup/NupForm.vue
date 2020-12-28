<template>
  <!-- Finished Size -->
  <div class="container">
    <div id="form">
      <form @submit.prevent="imposeOnSheet">
        <div class="form-control">
          <label for="qty">Quantity</label><br />
          <input type="number" id="qty" v-model.number="nUpInput.qty" />
        </div>
        <div class="form-control dimensions">
          <div>
            <label for="width">Width in mm</label><br />
            <input type="number" id="width" v-model.number="nUpInput.width" />
          </div>
          <div class="x">X</div>
          <div>
            <label for="height">Height in mm</label><br />
            <input type="number" id="height" v-model.number="nUpInput.height" />
          </div>
          <div>
            <button type="button" @click="switchOrientation">
              Switch Orientation
            </button>
          </div>
        </div>

        <!-- Margins & Gutters -->
        <div class="form-control guttersmargins">
          <div>
            <label for="margins">Outside Margin</label><br />
            <input
              type="number"
              id="margins"
              v-model.number="nUpInput.margins"
            />
          </div>
          <div class="x"></div>
          <div>
            <label for="gutters">Gutters</label><br />
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
            <label for="sheet-width">Sheet Width in mm</label><br />
            <input
              type="number"
              id="sheet-width"
              v-model.number="nUpInput.sheetWidth"
            />
          </div>
          <div class="x">X</div>
          <div>
            <label for="sheet-height">Height in mm</label><br />
            <input
              type="number"
              id="sheet-height"
              v-model.number="nUpInput.sheetHeight"
            />
          </div>
        </div>
        <div class="buttons">
          <button>Impose</button>
        </div>
      </form>
    </div>
    <div class="results">
      <div>Maximum number out on Page :{{ result }}</div>
      <div>Sheets Required: {{ calculateSheets }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // mostOut: true,
      calculatedButtonPressed: false,
    };
  },
  computed: {
    nUpInput() {
      return this.$store.getters.loadInputData;
    },
    nUpResult() {
      return this.$store.getters.loadResults;
    },
    result() {
      // return this.mostOut ? this.nUpResult.nUp1 : this.nUpResult.nUp2;
      return this.nUpResult.nUp1;
    },
    calculateSheets() {
      if (!this.calculatedButtonPressed) {
        return 0;
      } else {
        return Math.ceil(this.$store.state.nUpInput.qty / this.result);
      }
    },
  },

  methods: {
    // calculateNup() {
    //   this.mostOut = true;
    //   this.calculatedButtonPressed = true;
    //   this.$store.dispatch('calculateNup');
    // },
    imposeOnSheet() {
      this.mostOut = true;
      this.calculatedButtonPressed = true;
      this.$store.dispatch('imposeOnSheet');
    },
    switchOrientation() {
      this.$store.dispatch('switchOrientation');
      this.calculateSheets();
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
  text-align: center;
}

.guttersmargins {
  display: flex;
  justify-content: center;
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
</style>
