<template>
  <div class="canvas-container">
    <canvas
      id="nup-canvas"
      :width="nUpInput.sheetWidth"
      :height="nUpInput.sheetHeight"
    ></canvas>
    <button @click="drawOnSheet">Test</button>
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

    this.drawOnSheet();
  },
  methods: {
    drawOnSheet() {
      const { width, height, margins, gutters } = this.nUpInput;

      let startingPointX = this.nUpInput.margins;
      let startingPointY = this.nUpInput.margins;

      this.vueCanvas.clearRect(
        0,
        0,
        this.nUpInput.sheetWidth,
        this.nUpInput.sheetHeight
      );

      for (
        let i = 0;
        startingPointY < this.nUpInput.sheetHeight - height - margins;
        i++
      ) {
        for (
          let j = 0;
          startingPointX < this.nUpInput.sheetWidth - width - margins;
          j++
        ) {
          this.vueCanvas.fillRect(
            startingPointX,
            startingPointY,
            width,
            height
          );
          startingPointX = startingPointX + width + gutters;
        }

        startingPointX = this.nUpInput.margins;
        startingPointY = startingPointY + height + gutters;
      }

      this.$emit;
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
