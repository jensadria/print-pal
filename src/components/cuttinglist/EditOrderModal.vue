<template>
  <teleport to="body">
    <div v-if="show" @click="exitOrder" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <h2>Edit Order</h2>
        </header>
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
        <base-button @click="editOrder">Save</base-button>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      dueDate: { val: this.order.dueDate, isValid: true },
      dueTime: { val: this.order.dueTime, isValid: true },
      petNumber: { val: this.order.petNumber, isValid: true },
      packs: { val: this.order.packs, isValid: true },
      bulks: { val: this.order.bulks, isValid: true },
      formIsValid: true,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    order: Object,
    index: Number,
    id: String,
  },
  emits: ['close', 'save'],
  methods: {
    editOrder() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const index = this.index;
      const editedOrder = {
        dueDate: this.dueDate.val,
        dueTime: this.dueTime.val,
        petNumber: this.petNumber.val,
        packs: this.packs.val,
        bulks: this.bulks.val,
      };

      this.$store.dispatch('editOrder', { index, editedOrder });

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
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.orders-input {
  display: flex;
  flex-direction: column;
}

label {
  width: 200px;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
