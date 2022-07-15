<template>
  <Loading v-if="isLoading"/>
  <section v-else>
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:items-start">
        <ProductList/>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "@/components/Loading"
import ProductList from "@/layout/ProductList"
import { productRequest } from "@/services/productAPI";
export default {
  name: 'Home',
  components: {
    Loading,
    ProductList,
  },
  data(){
    return {
      isLoading: true,
    }
  },
  async created(){
    const data = await productRequest();
    this.$store.commit('setProduct', data.products)
    this.isLoading = data?.false
  },
}
</script>
