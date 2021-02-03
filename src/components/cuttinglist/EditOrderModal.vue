<template>
  <teleport to="body">
    <div v-if="show" @click="exitOrder" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <h2>Edit Order</h2>
        </header>
        {{ getCurrentOrder }}
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
      dueDate: {
        val: this.getCurrentOrder?.dueDate,
        isValid: true,
      },
      dueTime: {
        val: this.getCurrentOrder?.dueTime,
        isValid: true,
      },
      petNumber: {
        val: this.getCurrentOrder?.petNumber,
        isValid: true,
      },
      packs: {
        val: this.getCurrentOrder?.packs,
        isValid: true,
      },
      bulks: {
        val: this.getCurrentOrder?.bulks,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    productIndex: Number,
    orderIndex: Number,
  },
  emits: ['close', 'save'],
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
    getCurrentOrder() {
      const currentList = this.$store.getters.getCurrentList;

      return currentList[this.productIndex].orders[this.orderIndex];
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
