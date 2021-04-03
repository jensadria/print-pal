<template>
  <ul>
    <completed-list-item
      v-for="product in completedOrders"
      :key="product"
      :product="product"
    >
    </completed-list-item>
  </ul>
</template>

<script>
import CompletedListItem from './CompletedListItem.vue';

export default {
  components: { CompletedListItem },
  computed: {
    completedOrders() {
      return this.$store.getters.getCompletedOrders;
    },
  },
};
</script>

<style></style>
