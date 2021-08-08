<template>
  <base-order-modal title="Add Order">
    <stock-selector></stock-selector>
    <div class="orders-input">
      <div class="pet-number-area">
        <label for="pet-number">PET Number</label>
        <input
          type="text"
          id="pet-number"
          v-model="petNumber.val"
          @blur="petNumber.isValid"
        />
      </div>
      <div class="due-date-area">
        <label for="due-date">Due Date</label>
        <input type="date" v-model="dueDate.val" />
      </div>
      <div class="due-time-area">
        <label for="due-time">Due Time</label>
        <input type="time" v-model="dueTime.val" />
      </div>

      <div class="packs-area">
        <label for="packs">Packs (of {{ selectedStockPackQty }})</label>
        <input
          type="number"
          id="packs"
          v-model.number="packs.val"
          min="0"
          @blur="packs.isValid"
        />
      </div>
      <div class="bulks-area">
        <label for="bulks">Bulks</label>
        <input
          type="number"
          id="bulks"
          v-model.number="bulks.val"
          min="0"
          @blur="packs.isValid"
        />
      </div>
    </div>
    <div>
      <p v-if="!petNumber.isValid">Please assign an order</p>
      <br />
      <p v-if="noOrdersEntered">
        Please assign at least one pack or bulk
      </p>
    </div>
    <template #buttons>
      <base-button @click="saveOrder">Save</base-button>
    </template>
  </base-order-modal>
</template>

<script>
import StockSelector from '../cuttinglist/StockSelector.vue';

export default {
  components: { StockSelector },
  data() {
    return {
      dueDate: { val: null, isValid: true },
      dueTime: { val: null, isValid: true },
      petNumber: { val: '', isValid: true },
      packs: { val: 0 },
      bulks: { val: 0 },
      noOrdersEntered: false,
      formIsValid: true,
    };
  },
  emits: ['save'],

  methods: {
    async saveOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const savedOrder = {
        productId: this.getSelectedStockId,
        dueDate: this.dueDate.val,
        dueTime: this.dueTime.val,
        petNumber: this.petNumber.val,
        packs: this.packs.val,
        bulks: this.bulks.val,
        cut: false,
        packed: false,
        completed: false,
      };
      console.log(savedOrder);

      await this.$store.dispatch('addOrderToDb', savedOrder);

      this.$emit('close');

      await this.$store.dispatch('LOAD_ORDERS');

      this.dueDate.val = null;
      this.dueTime.val = null;
      this.petNumber.val = '';
      this.packs.val = 0;
      this.bulks.val = 0;

      this.formIsValid = true;
      this.noOrdersEntered = false;
    },
    exitOrder() {
      this.$emit('close');
    },
    validateForm() {
      this.formIsValid = true;

      if (this.petNumber.val === '') {
        this.petNumber.isValid = false;
        this.formIsValid = false;
      }
      if (this.packs.val === 0 && this.bulks.val === 0) {
        this.noOrdersEntered = true;
      }
    },
  },
  computed: {
    getSelectedStockId() {
      return this.$store.getters.getSelectedStock.id;
    },
    selectedStockPackQty() {
      return this.$store.getters.getSelectedStock.packQty;
    },
  },
};
</script>

<style scoped>
.orders-input {
  width: 100%;
  column-gap: 3rem;
  row-gap: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'pet-number .'
    'due-date due-time'
    'packs bulks';
  grid-template-rows: auto;
}

.pet-number-area {
  grid-area: pet-number;
  width: 100%;
}

.due-date-area {
  grid-area: due-date;
  width: 100%;
}

.due-time-area {
  grid-area: due-time;
}

.packs-area {
  grid-area: packs;
}

.bulks-area {
  grid-area: bulks;
}

input,
label {
  display: block;
  text-align: left;
  padding: 0.5px;
}
input {
  display: block;
  width: 100%;
  border: 2px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  font-size: 1.5rem;
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
</style>
