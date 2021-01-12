<template>
  <div class="container">
    <base-card>
      <h2>Current Cutting List</h2>

      <ul>
        <current-list-item
          v-for="product in currentCuttingList"
          :key="product"
          :product="product"
          :index="currentCuttingList.indexOf(product) + 1"
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
