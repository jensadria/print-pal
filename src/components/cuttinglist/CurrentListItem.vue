<template>
  <li>
    <slot>
      <div class="product-item">
        <div class="amount">
          <h3>{{ sheetsTotal }} x {{ product.name }}</h3>
          <h4>
            {{ flatSheetsRequired }} Flat Sheets ( {{ product.noOutFlatSheet }}
            out )
          </h4>
        </div>
        <div class="packing">
          <h4>
            {{ product.packs }} {{ product.packs > 1 ? 'Packs' : 'Pack' }} of
            {{ product.packQty }} <br />
            {{ product.bulks }} {{ product.bulks > 1 ? 'Bulks' : 'Bulk' }} of
            {{ product.bulkQty }}
          </h4>
        </div>
        <div class="jobs"></div>
        <div class="buttons">
          <i class="fas fa-edit edit"></i>
          <i
            class="fas fa-minus-circle delete"
            @click="deleteItem(index - 1)"
          ></i>
        </div>
      </div>
    </slot>
  </li>
</template>

<script>
export default {
  props: ['product', 'index'],
  computed: {
    flatSheetsRequired() {
      const { packs, bulks, packQty, bulkQty, noOutFlatSheet } = this.product;

      const sheetsFromPacks = (packs * packQty) / noOutFlatSheet;
      const sheetsFromBulks = (bulks * bulkQty) / noOutFlatSheet;

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
  },
};
</script>

<style scoped>
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

.amount {
  text-align: left;
  flex: 2;
}
.packing {
  text-align: left;
  flex: 1;
  border-left: 1px solid #000;
  padding-left: 1rem;
}
.jobs {
  flex: 1;
}

.buttons {
  display: flex;
  flex-direction: column;
}

.edit {
  color: green;
  margin-bottom: 1rem;
}

.delete {
  color: maroon;
}
</style>
