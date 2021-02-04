<template>
  <base-order-modal title="Add Order">
    <section>
      <div class="orders-input">
        <div>
          <label for="due-date">Due Date</label>
          <input type="date" v-model="dueDate.val" />
        </div>
        <div>
          <label for="due-time">Due Time </label>
          <input type="time" v-model="dueTime.val" />
        </div>
        <div>
          <label for="pet-number">PET Number</label>
          <input
            type="text"
            id="pet-number"
            v-model="petNumber.val"
            @blur="petNumber.isValid"
          />
        </div>
        <p v-if="!petNumber.isValid">Please assign an order</p>
        <div>
          <label for="packs">Packs</label>
          <input
            type="number"
            id="packs"
            v-model.number="packs.val"
            min="0"
            @blur="packs.isValid"
          />
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
        <p v-if="!packs.isValid">Please assign at least one pack or bulk</p>
      </div>
    </section>
    <base-button @click="saveOrder">Save</base-button>
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
    };
  },
  props: {
    id: String,
  },
  emits: ['save'],

  methods: {
    saveOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const id = this.id;
      const savedOrder = {
        dueDate: this.dueDate.val,
        dueTime: this.dueTime.val,
        petNumber: this.petNumber.val,
        packs: this.packs.val,
        bulks: this.bulks.val,
      };

      this.$store.dispatch('addOrder', { id, savedOrder });

      this.$emit('close');

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
      if (this.packs.val === 0 && this.packs.val === 0) {
        this.packs.isValid = false;
        this.formIsValid = false;
      }
    },
  },
};
</script>

<style scoped></style>
