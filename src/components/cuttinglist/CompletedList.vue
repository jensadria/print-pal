<template>
  <div class="completed-list">
    <ul>
      <completed-list-item
        v-for="product in completedOrders"
        :key="product"
        :product="product"
      >
      </completed-list-item>
    </ul>
  </div>
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

<style scoped>
.completed-list {
  margin: 1rem;
}
</style>
