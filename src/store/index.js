import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
  },
  getters: {
    sortProduct: (state) => (params) => {
      return params === 'title-desc' ? state.products.sort((a, b) => a.title > b.title && -1)
            : params === 'title-asc' ? state.products.sort((a, b) => a.title.localeCompare(b.title))
            : params === 'price-asc' ? state.products.sort((a, b) => parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price))
            : params === 'price-desc' ? state.products.sort((a, b) => parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price))
            : state.products
    }
  },
  mutations: {
    setProduct(state, product){
      state.products = product;
    },
  },
})
