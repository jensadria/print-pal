<template>
  <form action="">
    <div class="form-control">
      <label for="qty">Quantity</label>
      <input type="number" id="qty" />
    </div>
    <div class="form-control dimensions">
      <div>
        <label for="qty">Width in mm</label>
        <input type="number" id="width" />
      </div>
      <div>
        <label for="qty">Height in mm</label>
        <input type="number" id="height" />
      </div>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style scoped>
.form-control {
  display: flex;
  width: 40vw;
  margin: 0.8rem;
}

.form-control.dimensions {
  display: flex;
  width: 40vw;
  margin: 0.8rem;
}

input {
  border-color: var(--mid-blue);
  border-radius: 0.2rem;
}

#qty {
  width: 100%;
  text-align: right;
}

#width,
#height {
  width: 40%;
}
</style>
