<template>
  <teleport to="body">
    <div v-if="show" @click="exitOrder" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <h2>Add Order</h2>
        </header>
        <section>
          <div class="orders-input">
            <div>
              <label for="due-date">Due Date </label>
              <input type="date" v-model="dueDate" />
            </div>
            <div>
              <label for="due-time">Due Time </label>
              <input type="time" v-model="dueTime" />
            </div>
            <div>
              <label for="pet-number">PET Number</label>
              <input type="text" id="pet-number" v-model="petNumber" />
            </div>
            <div>
              <label for="packs">Packs</label>
              <input type="number" id="packs" v-model="packs" />
            </div>
            <div>
              <label for="bulks">Bulks</label>
              <input type="number" id="bulks" v-model="bulks" />
            </div>
          </div>
        </section>
        <base-button @click="saveOrder">Save</base-button>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  data() {
    return {
      dueDate: null,
      dueTime: null,
      petNumber: '',
      packs: 0,
      bulks: 0,
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    id: String,
  },
  emits: ['close', 'save'],
  methods: {
    saveOrder() {
      const id = this.id;
      const savedOrder = {
        dueDate: this.dueDate,
        dueTime: this.dueTime,
        petNumber: this.petNumber,
        packs: this.packs,
        bulks: this.bulks,
      };

      this.$store.dispatch('addOrder', { id, savedOrder });

      this.$emit('close');
    },
    exitOrder() {
      this.$emit('close');
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
