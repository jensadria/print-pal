<template>
  <div class="container">
    <base-card>
      <ul>
        <li v-for="product in currentCuttingList" :key="product">
          {{ product.name }}
        </li>
      </ul>
    </base-card>
  </div>
</template>

<script>
export default {
  computed: {
    currentCuttingList() {
      return this.$store.getters.getCurrentList;
    },
  },
};
</script>

<style></style>
