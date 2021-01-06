<template>
  <div class="container">
    <add-to-list></add-to-list>
    <current-list></current-list>
  </div>
</template>

<script>
import AddToList from '../components/cuttinglist/AddToList.vue';
import CurrentList from '../components/cuttinglist/CurrentList.vue';

export default {
  components: {
    AddToList,
    CurrentList,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  /* flex-basis: auto; */
  /* flex-grow: 1; */
  width: 100%;
  /* flex-wrap: wrap; */
}

add-to-list,
current-list {
  flex: 1;
  /* flex-grow: 1; */
}
</style>
