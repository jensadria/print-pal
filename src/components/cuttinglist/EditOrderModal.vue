<template>
  <base-order-modal title="Edit Order">
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
          {{ packQty }}
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
          {{ bulkQty }}
        </div>
        <p v-if="!packs.isValid">Please assign at least one pack or bulk</p>
      </div>
    </section>
    <base-button @click="editOrder">Save</base-button>
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
      console.log(this.orderIndex, this.productIndex);
      console.log(this.getCurrentOrder);

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
    this.dueDate.val = this.getCurrentOrder?.dueDate;
    this.dueTime.val = this.getCurrentOrder?.dueTime;
    this.petNumber.val = this.getCurrentOrder?.petNumber;
    this.packs.val = this.getCurrentOrder?.packs;
    this.bulks.val = this.getCurrentOrder?.bulks;
    this.packQty = this.getCurrentProduct?.packQty;
    this.bulkQty = this.getCurrentProduct?.bulkQty;
  },
};
</script>

<style scoped></style>
