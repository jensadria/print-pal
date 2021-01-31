<template>
  <li>
    <div class="product-item">
      <div class="due">
        <h3>24/2</h3>
      </div>
      <div class="amount">
        <h3>{{ sheetsTotal }} x {{ product.name }}</h3>
        <h4>
          {{ flatSheetsRequired }} Flat Sheets ( {{ product.noOutFlatSheet }}
          out )
        </h4>
        <h4>{{ packs }} Packs Total</h4>
        <h4>{{ bulks }} Bulks Total</h4>
      </div>
      <div class="orders">
        <add-order-modal
          :show="showAddOrderModal"
          @close="showAddOrderModal = false"
          :id="product.id"
        ></add-order-modal>
        <edit-order-modal
          :show="showEditOrderModal"
          @close="showEditOrderModal = false"
          :product="product"
        ></edit-order-modal>
        <div>
          <div class="order" v-for="order in product.orders" :key="order">
            <h4>{{ order.petNumber }}</h4>
            <div>
              {{ order.dueDate ? 'Due' : '' }} {{ order.dueDate }}
              {{ order.dueTime }}
            </div>
            <div>{{ order.packs }} Packs</div>
            <div>{{ order.bulks }} Bulks</div>
            <div>
              <button @click="showEditOrderModal = true">Edit</button>
            </div>
          </div>
        </div>
        <div class="add-order">
          <button @click="showAddOrderModal = true">
            Add Order
          </button>
        </div>
      </div>
      <div class="buttons">
        <i class="fas fa-minus-circle delete" @click="deleteItem(index)"></i>
      </div>
    </div>
  </li>
</template>

<script>
import AddOrderModal from '../cuttinglist/AddOrderModal.vue';
import EditOrderModal from '../cuttinglist/EditOrderModal.vue';

export default {
  components: { AddOrderModal, EditOrderModal },

  props: ['product', 'index'],
  data() {
    return {
      showAddOrderModal: false,
      showEditOrderModal: false,
    };
  },
  computed: {
    orders() {
      return this.product.orders;
    },
    packs() {
      return this.product.orders.reduce((acc, order) => acc + order.packs, 0);
    },
    bulks() {
      return this.product.orders.reduce((acc, order) => acc + order.bulks, 0);
    },

    flatSheetsRequired() {
      const { packQty, bulkQty, noOutFlatSheet } = this.product;

      const sheetsFromPacks = (this.packs * packQty) / noOutFlatSheet;
      const sheetsFromBulks = (this.bulks * bulkQty) / noOutFlatSheet;

      return Math.ceil(sheetsFromPacks + sheetsFromBulks);
    },
    sheetsTotal() {
      return this.flatSheetsRequired * this.product.noOutFlatSheet;
    },
  },
  methods: {
    deleteItem(index) {
      this.$store.dispatch('deleteItem', index);
    },

    // formatDate(str) {
    //   const arr = str.split('-');

    //   const date = `${arr[2]} ${arr[1]}`;
    //   return date;
    // },
  },
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
li {
  list-style: none;
  display: flex;
  padding: 1rem;
}

li:nth-child(odd) {
  background-color: lightgray;
}

li:hover {
  background-color: var(--very-light-blue);
}

.product-item {
  display: flex;
  width: 100%;
}

.due {
  flex: 1;
}

.amount {
  text-align: left;
  flex: 5;
}

.orders {
  flex: 3;
}

.orders-input {
  text-align: left;
  border-left: 1px solid #000;
  padding-left: 1rem;
  display: flex;
}

.orders-input input:first-child {
  flex: 4;
}

.orders-input input:not(:first-child) {
  width: 50px;
}

.add-order {
  text-align: left;
}

.order {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 50% 40% 10%;
  /* grid-template-rows: auto; */
  grid-auto-flow: column;
  text-align: left;
  border-bottom: 1px solid;
  /* grid-template-areas */
}

.buttons {
  flex: 1;
  display: grid;
  place-items: center;
}

.edit {
  color: green;
  margin-bottom: 1rem;
}

.delete {
  color: maroon;
}
</style>
