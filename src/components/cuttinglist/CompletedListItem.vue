<template>
  <li>
    {{ product.petNumber }} - {{ product.productId }} - {{ productName }} -
    {{ product.bulks }} Bulks - {{ product.packs }} Packs
  </li>
</template>

<script>
export default {
  props: ['product'],
  computed: {
    productName() {
      const products = this.$store.getters.getProducts;
      const product = products.find((el) => el.id === this.product.productId);

      return product.name;
    },
  },
};
</script>

<style>
li {
  list-style: none;
  display: flex;
}
</style>
