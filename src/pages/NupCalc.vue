<template>
  <div>
    <base-card><nup-form></nup-form></base-card>
    <base-card><nup-canvas></nup-canvas></base-card>
  </div>
</template>

<script>
import NupForm from '../components/nup/NupForm.vue';
import NupCanvas from '../components/nup/NupCanvas.vue';

export default {
  components: {
    NupForm,
    NupCanvas,
  },
};
</script>

<style scoped>
div {
  display: flex;
  width: 100%;
}

/* .size-control {
  width: 50%;
} */
</style>
