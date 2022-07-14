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
import axios from "axios";
import Loading from "@/components/Loading"
import ProductList from "@/layout/ProductList"
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
  created(){
    const token = "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"
    axios.get('https://teknasyon.netlify.app/.netlify/functions/products', {
      headers: {
          "X-Access-Token": `${token}`,
        },
    })
    .then((res) => {
      this.$store.commit('setProduct', res.data.products)
      this.isLoading = false
    })
    .catch((error) => {
      throw error
    })
  },
}
</script>
