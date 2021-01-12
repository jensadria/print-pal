<template>
  <li>
    <slot>
      <div class="product-item">
        <div class="left-column">
          <h3>
            {{ sheetsTotal }} x {{ product.name }} -
            {{ flatSheetsRequired }} Flat Sheets ( {{ product.noOutFlatSheet }}
            out )
          </h3>
          {{ product.packs }} Packs of {{ product.packQty }} <br />
          {{ product.bulks }} Bulks of {{ product.bulkQty }}
        </div>
      </div>
    </slot>
  </li>
</template>

<script>
export default {
  props: ['product'],
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

.left-column {
  text-align: left;
}
</style>
