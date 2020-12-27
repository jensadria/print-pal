<template>
  <div class="canvas-container">
    <canvas
      id="nup-canvas"
      :width="nUpInput.sheetWidth"
      :height="nUpInput.sheetHeight"
    ></canvas>
    <p><button type="button" @click="drawRect()">Test</button></p>
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
    // result() {
    //   return this.mostOut ? this.nUpResult.nUp1 : this.nUpResult.nUp2;
    // },
  },
  mounted() {
    const c = document.getElementById('nup-canvas');
    const ctx = c.getContext('2d');
    this.vueCanvas = ctx;
  },
  methods: {
    drawRect() {
      let width = this.nUpInput.width;
      let height = this.nUpInput.height;
      let startingPointX = this.nUpInput.margins;
      let startingPointY = this.nUpInput.margins;
      let margin = this.nUpInput.margins;
      // let qty = this.nUpInput.qty;

      this.vueCanvas.clearRect(
        0,
        0,
        this.nUpInput.sheetWidth,
        this.nUpInput.sheetHeight
      );
      // this.vueCanvas.beginPath();
      this.vueCanvas.fillRect(startingPointX, startingPointY, width, height);
      startingPointX = startingPointX + width + margin;
      this.vueCanvas.fillRect(startingPointX, startingPointY, width, height);
      startingPointX = startingPointX + width + margin;
      this.vueCanvas.fillRect(startingPointX, startingPointY, width, height);
      startingPointX = startingPointX + width + margin;
      this.vueCanvas.fillRect(startingPointX, startingPointY, width, height);
      // this.vueCanvas.stroke();
    },
  },
};
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  display: block;
}

#nup-canvas {
  border: 1px solid red;
  position: relative;
  width: 100%;
  height: auto;
}
</style>
