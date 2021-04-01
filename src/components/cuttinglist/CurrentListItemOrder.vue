<template>
  <div class="order">
    <h4>{{ order.petNumber }}</h4>
    <div>
      {{ order.dueDate === 'null' ? 'No Due Date' : 'Due ' + order.dueDate }}
      {{ order.dueTime === 'null' ? '' : order.dueTime }}
    </div>
    <div>{{ order.packs }} Packs</div>
    <div>{{ order.bulks }} Bulks</div>
    <edit-order-modal
      :show="showEditOrderModal"
      @close="showEditOrderModal = false"
      :order="order"
    ></edit-order-modal>
    <button @click="showEditOrderModal = true" class="edit-button">
      <i class="fas fa-edit edit"></i>
    </button>
    <div></div>
  </div>
</template>

<script>
import EditOrderModal from './EditOrderModal.vue';

export default {
  components: { EditOrderModal },
  props: ['order'],
  data() {
    return {
      showEditOrderModal: false,
    };
  },
};
</script>

<style scoped>
.order {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 50% 40% 10%;
  /* grid-template-rows: auto; */
  grid-auto-flow: column;
  text-align: left;
  padding: 5px;
  margin-bottom: 8px;
  background-color: var(--very-light-blue);
  border-radius: 0.5rem;
}

.edit-button {
  border: none;
  background: transparent;
}

.edit {
  width: 1rem;
  color: var(--dark-blue);
}

.edit:hover {
  color: var(--success-green);
  cursor: pointer;
}

edit:focus {
  outline: none;
}
</style>
