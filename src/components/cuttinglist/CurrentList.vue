<template>
  <div class="container">
    <base-card>
      <h2>Cutting List</h2>

      <ul>
        <current-list-item
          v-for="(product, productIndex) in currentCuttingList"
          :key="product"
          :product="product"
          :productIndex="productIndex"
        >
        </current-list-item>
        <!-- {{
          JSON.stringify(currentCuttingList[0].orders)
        }} -->
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
    currentCuttingList() {
      return this.$store.getters.getCurrentList;
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
