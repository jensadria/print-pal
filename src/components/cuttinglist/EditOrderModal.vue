<template>
  <base-order-modal title="Edit Order">
    <template #pet-number>
      <div>{{ petNumber.val }}</div>
    </template>
    <template #due-date>
      <input type="date" v-model="dueDate.val" />
    </template>
    <template #due-time>
      <input type="time" v-model="dueTime.val" />
    </template>

    <template #packs>
      <input
        type="number"
        id="packs"
        v-model.number="packs.val"
        min="0"
        @blur="clearValidity('packs')"
      />
      {{ packQty }}
    </template>
    <template #bulks>
      <input
        type="number"
        id="bulks"
        v-model.number="bulks.val"
        min="0"
        @blur="clearValidity('bulks')"
      />
    </template>

    <template #buttons class="buttons">
      <div class="buttons">
        <base-button @click="editOrder">Save</base-button>
        <div>
          <button
            class="complete-order complete"
            @click="toggleOrderStatus('completed')"
          >
            <i class="fas fa-check-circle fa-3x"></i>
          </button>
          <button class="remove-order delete" @click="deleteOrder">
            <i class="far fa-times-circle fa-3x "></i>
          </button>
          <!-- <button @click="toggleOrderStatus('cut')">
          Cut {{ orderToEdit.cut }}
        </button>
        <button @click="toggleOrderStatus('packed')">
          Packed {{ packed }}
        </button> -->
        </div>
      </div>
    </template>
  </base-order-modal>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  data() {
    return {
      dueDate: { val: null, isValid: true },
      dueTime: { val: null, isValid: true },
      petNumber: { val: '', isValid: true },
      packs: { val: 0, isValid: true },
      bulks: { val: 0, isValid: true },
      cut: null,
      packed: null,
      completed: null,
      packQty: 0,
      bulkQty: 0,
      formIsValid: true,
      noOrdersEntered: false,
    };
  },
  emits: ['save'],
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
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
    loadValues() {
      this.dueDate.val = this.orderToEdit?.dueDate;
      this.dueTime.val = this.orderToEdit?.dueTime;
      this.petNumber.val = this.orderToEdit?.petNumber;
      this.packs.val = this.orderToEdit?.packs;
      this.bulks.val = this.orderToEdit?.bulks;
      this.cut = this.orderToEdit?.cut;
      this.packed = this.orderToEdit?.packed;
      this.completed = this.orderToEdit?.completed;
      this.packQty = this.currentProduct?.packQty;
      this.bulkQty = this.currentProduct?.bulkQty;
    },
    async editOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const orderId = this.orderToEdit._id;
      const savedOrder = {
        dueDate: this.dueDate.val,
        dueTime: this.dueTime.val,
        packs: this.packs.val,
        bulks: this.bulks.val,
        cut: false,
        packed: false,
        completed: false,
      };

      await this.$store.dispatch('editOrder', { orderId, savedOrder });

      this.$emit('close');

      await this.$store.dispatch('LOAD_ORDERS');
    },
    async deleteOrder() {
      const orderId = this.orderToEdit._id;
      await this.$store.dispatch('deleteOrder', orderId);
      this.$emit('close');
      await this.$store.dispatch('LOAD_ORDERS');
    },
    async toggleOrderStatus(orderStage) {
      const orderId = this.orderToEdit._id;
      await this.$store.dispatch('toggleOrderStatus', { orderStage, orderId });
      this.$emit('close');

      await this.$store.dispatch('LOAD_ORDERS');
    },
  },
  computed: {
    orderToEdit() {
      const currentOrders = this.$store.getters.getActiveOrders;

      return currentOrders.find(
        (el) =>
          el.petNumber === this.order.petNumber &&
          el.productId === this.order.productId
      );
    },
    currentProduct() {
      return this.$store.getters.getCurrentProducts.find(
        (el) => el.id === this.order.productId
      );
    },
  },
  mounted() {
    this.loadValues();
  },
};
</script>

<style scoped>
input {
  width: 100%;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fa-times-circle {
  color: rgb(231, 98, 98);
  margin: 0.5rem;
}

.fa-check-circle {
  color: rgb(0, 184, 31);
  margin: 0.5rem;
}
.fa-check-circle:hover,
.fa-times-circle:hover {
  margin: 0.5rem;
}

.delete,
.complete {
  cursor: pointer;
  border: none;
  background-color: #fff;
}
</style>
