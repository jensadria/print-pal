<template>
  <div class="container">
    <base-card>
      <h2>Cutting List</h2>

      <ul>
        <current-list-item
          v-for="product in currentProducts"
          :key="product"
          :product="product"
        >
        </current-list-item>
      </ul>
    </base-card>
  </div>
</template>

<script>
import CurrentListItem from '../cuttinglist/CurrentListItem.vue';

export default {
  components: {
    CurrentListItem,
  },
  computed: {
    currentProducts() {
      return this.$store.getters.getCurrentProducts;
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-bottom: 1rem;
}
</style>
