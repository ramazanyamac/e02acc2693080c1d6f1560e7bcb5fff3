import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
  },
  getters: {
    sortProduct: (state) => (params) => {
      const productsMap = {
        "title-desc": () =>
          state.products.sort((a, b) => a.title > b.title && -1),
        "title-asc": () =>
          state.products.sort((a, b) => a.title.localeCompare(b.title)),
        "price-asc": () =>
          state.products.sort(
            (a, b) =>
              parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price)
          ),
        "price-desc": () =>
          state.products.sort(
            (a, b) =>
              parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price)
          ),
      };

      if (typeof productsMap[params] !== "undefined") {
        return productsMap[params]();
      }

      return state.products;
    },
  },
  mutations: {
    setProduct(state, product) {
      state.products = product;
    },
  },
});
