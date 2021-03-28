<template>
  <base-order-modal title="Add Order">
    <div>{{ name }}</div>
    <div>
      <div>
        <label for="pet-number">PET Number</label>
        <input
          type="text"
          id="pet-number"
          v-model="petNumber.val"
          @blur="petNumber.isValid"
        />
      </div>
      <div>
        <label for="due-date">Due Date</label>
        <input type="date" v-model="dueDate.val" />
      </div>
      <div>
        <label for="due-time">Due Time</label>
        <input type="time" v-model="dueTime.val" />
      </div>

      <div>
        <label for="packs">Packs</label>
        <input
          type="number"
          id="packs"
          v-model.number="packs.val"
          min="0"
          @blur="packs.isValid"
        />
        {{ selectedStockPackQty }}
      </div>
      <div>
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
    <template #error-message>
      <p v-if="!petNumber.isValid">Please assign an order</p>
      <br />
      <p v-if="noOrdersEntered">
        Please assign at least one pack or bulk
      </p>
    </template>
    <template #buttons>
      <base-button @click="saveOrder">Save</base-button>
    </template>
  </base-order-modal>
</template>

<script>
export default {
  data() {
    return {
      dueDate: { val: null, isValid: true },
      dueTime: { val: null, isValid: true },
      petNumber: { val: '', isValid: true },
      packs: { val: 0, isValid: true },
      bulks: { val: 0, isValid: true },
      formIsValid: true,
      noOrdersEntered: false,
    };
  },
  props: {
    id: String,
    name: String,
  },
  emits: ['save'],

  methods: {
    async saveOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const savedOrder = {
        productId: this.id,
        dueDate: this.dueDate.val,
        dueTime: this.dueTime.val,
        petNumber: this.petNumber.val,
        packs: this.packs.val,
        bulks: this.bulks.val,
        cut: false,
        packed: false,
        completed: false,
      };

      await this.$store.dispatch('addOrderToDb', savedOrder);
      this.$emit('close');
      await this.$store.dispatch('LOAD_ORDERS');

      this.dueDate.val = null;
      this.dueTime.val = null;
      this.petNumber.val = '';
      this.packs.val = 0;
      this.bulks.val = 0;
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
};
</script>

<style scoped>
section > div > div {
  width: 60%;
  display: flex;
}

section > div > div > label {
  flex: 2 0 50%;
}

section > div > div > slot {
  width: auto;
  flex: 1;
  justify-content: left;
}

input {
  width: 100%;
}
</style>
