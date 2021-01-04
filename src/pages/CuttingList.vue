<template>
  <div class="container">
    <base-card>
      <div class="new-product">
        <h2>Add Stock</h2>
        <form action="submit">
          <div>
            <label for="code-search">Search By Code</label>
            <input type="search" name="code-search" id="code-search" />
          </div>
          <div>
            <label for="name-search">Search By Name</label>
            <input type="search" name="name-search" id="name-search" />
          </div>
        </form>
      </div>
    </base-card>
    <base-card> </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: [],
    };
  },
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
.container {
  display: flex;
  width: 100%;
}

.radio-toolbar input[type='radio'] {
  opacity: 0;
  position: fixed;
  width: 0;
}
</style>
