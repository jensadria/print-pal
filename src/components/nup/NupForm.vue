<template>
  <!-- Finished Size -->
  <form action="">
    <div class="form-control">
      <label for="qty">Quantity</label><br />
      <input type="number" id="qty" />
    </div>
    <div class="form-control dimensions">
      <div>
        <label for="width">Width in mm</label><br />
        <input type="number" id="width" />
      </div>
      <div class="x">x</div>
      <div>
        <label for="height">Height in mm</label><br />
        <input type="number" id="height" />
      </div>
    </div>

    <!-- Sheet Size -->
    <div class="form-control sheet-dimensions">
      <div>
        <label for="sheet-width">Sheet Width in mm</label><br />
        <input type="number" id="sheet-width" value="450" />
      </div>
      <div class="x">x</div>
      <div>
        <label for="sheet-height">Height in mm</label><br />
        <input type="number" id="sheet-height" value="320" />
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
/* * {
  border: 1px dotted red;
} */

.form-control {
  display: flex;
  width: 40vw;
  margin: 0.8rem;
}

input {
  border: 2px solid gray;
  border-radius: 0.5rem;
  font-size: 30px;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-radius: 0.5rem;
  outline: none;
}

#qty {
  width: 30%;
  text-align: center;
  margin-left: 1rem;
}

.x {
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
}

#width,
#height,
#sheet-width,
#sheet-height {
  width: 50%;
  text-align: center;
}
</style>
