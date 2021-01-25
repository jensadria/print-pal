<template>
  <div class="container">
    <h2>Add Stock</h2>
    <form>
      <div class="search-container">
        <div class="search-input">
          <label for="name-search">Search By Name or Code</label>
          <input
            type="input"
            name="name-search"
            id="name-search"
            v-model.trim="searchName"
            autocomplete="off"
          />
          <ul v-show="searchName" class="dropdown-list">
            <li
              v-show="itemVisible(product)"
              v-for="product in products"
              :key="product.name"
              @click="selectStock(product.id)"
              class="dropdown-item"
            >
              {{ product.name }} - {{ product.id }} -
              {{ itemVisible(product) }}
            </li>
          </ul>
        </div>
      </div>
      <div class="stock">
        <div class="selected-stock">
          <h4>{{ selectedStock.name }}</h4>
        </div>

        <base-button mode="blue-bg" @click.prevent="addToList"
          >Add To List</base-button
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: null,
      searchCode: '',
      searchName: '',
      selectedStock: '',
    };
  },
  // computed: {
  //   filteredProducts() {
  //     return this.products.filter((product) => {
  //       return product.name
  //         .toLowerCase()
  //         .includes(this.searchName.toLowerCase());
  //     });
  //   },
  // },
  methods: {
    selectStock(id) {
      this.selectedStock = this.products.find((stock) => stock.id === id);
      this.searchName = '';
    },
    addToList() {
      const listItem = {
        id: this.selectedStock.id,
      };
      this.$store.dispatch('addToList', listItem);

      this.selectedStock = '';
    },
    itemVisible(product) {
      let currentProduct = product.name.toLowerCase();
      let currentInput = this.searchName.toLowerCase();
      return currentProduct.includes(currentInput);
    },
    // addAssignedJob(job) {
    //   this.assignedJobs.push(job);
    // },
  },
  mounted() {
    this.products = this.$store.getters.getProducts;
  },
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
.container {
  background-color: var(--very-light-gray);
  display: flex;
  width: auto;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
}

h2 {
  text-align: left;
  margin-bottom: 1rem;
}

.container > div {
  flex: 1;
}

.form-control {
  display: flex;
}

.stock {
  display: flex;
  align-items: center;
}

label {
  display: flex;
  text-align: left;
  padding: 0.5px;
  align-items: start;
}

input {
  display: flex;
  border: 2px solid gray;
  border-top: none;
  border-right: none;
  border-left: none;
  font-size: 20px;
  font-weight: medium;
  padding: 0.5px;
}

input:focus {
  border: 2px solid var(--mid-blue);
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: var(--very-light-blue);
  outline: none;
}

.selected-stock {
  flex-basis: 75%;
  text-align: left;
  background-color: var(--very-light-blue);
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  height: 1rem;
}

.jobs-input {
  display: flex;
}

.dropdown-list {
  position: absolute;
  width: auto;
  max-height: 500px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
</style>
