export default {
  async LOAD_PRODUCTS(context) {
    const data = await fetch(
      'https://print-pal.herokuapp.com/api/products/'
    ).then((response) => response.json());

    context.commit('LOAD_PRODUCTS', data);
  },
  async LOAD_ORDERS(context) {
    const data = await fetch(
      'https://print-pal.herokuapp.com/api/orders/'
    ).then((response) => response.json());

    context.commit('LOAD_ORDERS', data);
  },
  selectedStock(context, payload) {
    context.commit('selectedStock', payload);
  },
  editOrder(context, payload) {
    context.commit('editOrder', payload);
  },
  async addOrder(_, payload) {
    await fetch('https://print-pal.herokuapp.com/api/orders/', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success', data);
      })
      .catch((error) => console.error('Error', error));

    console.log(JSON.stringify(payload));
  },
  //   markAllComplete(context, payload) {
  //     const data await fetch('put')

  //     context.commit('markAllComplete', payload);
  //   },
};
