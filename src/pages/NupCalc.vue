<template>
  <!-- <base-card><nup-form></nup-form></base-card>
    <base-card><nup-canvas></nup-canvas></base-card> -->
  <div>
    <nup-form-calc></nup-form-calc>
  </div>
</template>

<script>
// import NupForm from '../components/nup/NupForm.vue';
// import NupCanvas from '../components/nup/NupCanvas.vue';
import NupFormCalc from '../components/nup/NupFormCalc.vue';

export default {
  components: {
    // NupForm,
    // NupCanvas,
    NupFormCalc,
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
