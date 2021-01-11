<template>
  <div class="container">
    <base-card>
      <div class="new-product">
        <h2>Add Stock</h2>
        <form @submit.prevent="addToList">
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
            <div class="selected-stock">
              <h2>{{ selectedStock.name }}</h2>
            </div>
          </div>
          <div class="packs-bulks">
            <div class="form-control">
              <div>
                <label for="packs">Packs</label>
                <input type="number" id="packs" v-model="packs" min="0" />
              </div>
              <div>
                <label for="bulks">Bulks</label>
                <input type="number" id="bulks" v-model="bulks" min="0" />
              </div>
            </div>
          </div>
          <div class="buttons">
            <base-button mode="blue-bg">Add To List</base-button>
          </div>
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
        packs: this.packs,
        bulks: this.bulks,
      };
      this.$store.dispatch('addToList', listItem);
    },
    itemVisible(product) {
      let currentProduct = product.name.toLowerCase();
      let currentInput = this.searchName.toLowerCase();
      return currentProduct.includes(currentInput);
    },
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
  display: flex;
  width: auto;
}

.container > div {
  flex: 1;
}

ul li {
  list-style: none;
  text-align: left;
  cursor: pointer;
}

ul li:hover {
  background-color: var(--very-light-blue);
}

#packs,
#bulks {
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

.search-container {
  display: flex;
  width: auto;
  flex-wrap: wrap;
  position: relative;
}

.search-input {
  flex: 1;
  margin-right: 1rem;
}

.selected-stock {
  flex: 2;
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
  font-size: 30px;
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

.buttons {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: left;
  margin-top: 30px;
}

.selected-stock {
  display: block;
  text-align: left;
  background-color: var(--very-light-blue);
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: 2.1rem;
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
