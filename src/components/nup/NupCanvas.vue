<template>
  <div class="canvas-container">
    <canvas
      id="nup-canvas"
      :width="nUpInput.sheetWidth"
      :height="nUpInput.sheetHeight"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vueCanvas: null,
    };
  },
  computed: {
    nUpInput() {
      return this.$store.getters.loadInputData;
    },
    nUpResult() {
      return this.$store.getters.loadResults;
    },
    result() {
      return this.mostOut ? this.nUpResult.nUp1 : this.nUpResult.nUp2;
    },
  },
  mounted() {
    const c = document.getElementById('nup-canvas');
    const ctx = c.getContext('2d');
    this.vueCanvas = ctx;
  },
};
</script>

<style scoped>
/* .canvas-container {
  width: 100%;
  height: 100%;
} */

#nup-canvas {
  border: 1px solid black;
}
</style>
