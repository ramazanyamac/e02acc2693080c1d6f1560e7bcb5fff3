import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProduct(state, product){
      state.products = product;
    },
  },
})
