<template>
  <base-order-modal title="Edit Order">
    <template #due-date>
      <input type="date" v-model="dueDate.val" />
    </template>
    <template #due-time>
      <input type="time" v-model="dueDate.val" />
    </template>
    <template #pet-number>
      <input type="text" v-model="petNumber.val" @blur="petNumber.isValid" />
      <p v-if="!petNumber.isValid">Please assign an order</p>
    </template>
    <template #packs>
      <input
        type="number"
        id="packs"
        v-model.number="packs.val"
        min="0"
        @blur="packs.isValid"
      />
      {{ packQty }}
    </template>
    <template #bulks>
      <input
        type="number"
        id="bulks"
        v-model.number="bulks.val"
        min="0"
        @blur="packs.isValid"
      />
      {{ bulkQty }}
      <p v-if="!packs.isValid">Please assign at least one pack or bulk</p>
    </template>
    <base-button @click="editOrder">Save</base-button>
    <base-button @click="deleteOrder">Remove Order</base-button>
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
      packQty: 0,
      bulkQty: 0,
      bulks: { val: 0, isValid: true },
      formIsValid: true,
    };
  },
  props: {
    productIndex: Number,
    orderIndex: Number,
  },
  emits: ['save'],
  methods: {
    editOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const productIndex = this.productIndex;

      const orderIndex = this.orderIndex;

      const editedOrder = {
        dueDate: this.dueDate,
        dueTime: this.dueTime,
        petNumber: this.petNumber,
        packs: this.packs,
        bulks: this.bulks,
      };

      this.$store.dispatch('editOrder', {
        productIndex,
        orderIndex,
        editedOrder,
      });

      this.$emit('close');
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
    loadValues() {
      this.dueDate.val = this.getCurrentOrder?.dueDate;
      this.dueTime.val = this.getCurrentOrder?.dueTime;
      this.petNumber.val = this.getCurrentOrder?.petNumber;
      this.packs.val = this.getCurrentOrder?.packs;
      this.bulks.val = this.getCurrentOrder?.bulks;
      this.packQty = this.getCurrentProduct?.packQty;
      this.bulkQty = this.getCurrentProduct?.bulkQty;
    },
  },
  computed: {
    getCurrentProduct() {
      return this.$store.getters.getCurrentList[this.productIndex];
    },

    getCurrentOrder() {
      const currentList = this.$store.getters.getCurrentList;

      return currentList[this.productIndex].orders[this.orderIndex];
    },
  },
  mounted() {
    this.loadValues();
  },
};
</script>

<style scoped></style>
