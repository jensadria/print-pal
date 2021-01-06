<template>
  <div class="container">
    <base-card>
      <div class="new-product">
        <h2>Add Stock</h2>
        <form @submit.prevent="addToList">
          <div>
            <label for="code-search">Search By Code</label>
            <input type="search" name="code-search" id="code-search" />
          </div>
          <div>
            <label for="name-search">Search By Name</label>
            <input type="search" name="name-search" id="name-search" />
          </div>
          <div class="packs-bulks">
            <div class="form-control">
              <div>
                <label for="packs">Packs</label>
                <input type="number" id="packs" v-model="packs" />
              </div>
              <div>
                <label for="bulks">Bulks</label>
                <input type="number" id="bulks" v-model="bulks" />
              </div>
            </div>
          </div>
          <div class="buttons">
            <base-button mode="blue-bg">Save</base-button>
          </div>
          <!-- <ul>
            <li v-for="product in products" :key="product.name">
              {{ product.name }}
            </li>
          </ul> -->
        </form>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      packs: 0,
      bulks: 0,
    };
  },
  methods: {
    addToList() {},
  },
  created() {
    this.products = this.$store.getters.getProducts;
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

.container > div {
  flex: 1;
}

#packs,
#bulks {
  width: 140px;
  text-align: left;
  font-size: 50px;
  width: 200px;
  height: 70px;
  margin-right: 3rem;
}

.packs-bulks {
  margin-top: 3rem;
}

.form-control {
  display: flex;
}

input,
label {
  display: block;
  text-align: left;
  padding: 0.5px;
}

input {
  display: block;
  border: 2px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  font-size: 30px;
  font-weight: medium;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: var(--very-light-blue);
  outline: none;
}

.buttons {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: left;
  margin-top: 30px;
}
</style>
