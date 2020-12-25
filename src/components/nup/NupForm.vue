<template>
  <!-- Finished Size -->
  <div class="container">
    <div id="form">
      <form @submit.prevent="calculateNup">
        <div class="form-control">
          <label for="qty">Quantity</label><br />
          <input type="number" id="qty" v-model.number="nUpInput.qty" />
        </div>
        <div class="form-control dimensions">
          <div>
            <label for="width">Width in mm</label><br />
            <input type="number" id="width" v-model.number="nUpInput.width" />
          </div>
          <div class="x">x</div>
          <div>
            <label for="height">Height in mm</label><br />
            <input type="number" id="height" v-model.number="nUpInput.height" />
          </div>
        </div>
        <div class="form-control">
          <div>
            <label for="margins">Outside Margin</label><br />
            <input
              type="number"
              id="margins"
              v-model.number="nUpInput.margins"
            />
          </div>
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
          <div class="x">x</div>
          <div>
            <label for="sheet-height">Height in mm</label><br />
            <input
              type="number"
              id="sheet-height"
              v-model.number="nUpInput.sheetHeight"
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
      <div>Number out on Page :{{ nUpResult.result }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    totalMargins() {
      return +(this.margins * 2);
    },
    nUpInput() {
      return this.$store.getters.loadInputData;
    },
    nUpResult() {
      return this.$store.getters.loadResults;
    },
  },

  methods: {
    calculateNup() {
      this.$store.dispatch('calculateNup');
    },
    switchOrientation() {
      this.$store.dispatch('switchOrientation');
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
