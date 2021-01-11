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
* {
  border: 0.1px dotted red;
}
.container {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.container > * {
  flex: 1 1 100%;
}
</style>
