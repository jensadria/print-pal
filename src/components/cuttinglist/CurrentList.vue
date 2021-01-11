<template>
  <div class="container">
    <base-card>
      <ul>
        <current-list-item
          v-for="product in currentCuttingList"
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
    currentCuttingList() {
      return this.$store.getters.getCurrentList;
    },
  },
};
</script>

<style></style>
