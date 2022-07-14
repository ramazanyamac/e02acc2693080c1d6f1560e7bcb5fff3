<template>
  <div class="lg:col-span-4">
          <div class="pt-2 pb-4 relative mx-auto text-gray-600">
            <input class="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" v-model="search" autocomplete="off">
          </div>

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              <span class="hidden sm:inline">
                Showing
              </span>
              {{slideProduct.length}} of {{products.length}} Products
            </p>

            <div class="ml-4">
              <label
                for="SortBy"
                class="sr-only"
              >
                Sort
              </label>

              <select @change="onFilter($event)" name="sort_by" class="text-sm border-gray-100 rounded">
                <option readonly>Sort</option>
                <option value="title-asc">Title, A-Z</option>
                <option value="title-desc">Title, Z-A</option>
                <option value="price-asc">Price, Low-High</option>
                <option value="price-desc">Price, High-Low</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-px mt-4 bg-gray-200 border border-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            <router-link :to="`/product/${urlIdLookup[product.id]}`" class="relative block bg-white" v-for="(product, index) in slideProduct" :key="index">
              <img loading="lazy" :alt="product.title" class="object-contain w-full h-56 lg:h-72" :src="product.images[0].src"/>
              <div class="p-6">
                <span class="inline-block px-3 py-1 text-xs font-medium bg-yellow-400">{{product.tags}}</span>
                <h5 class="mt-4 text-lg font-bold">{{product.title}}</h5>
                <p class="mt-2 text-sm font-medium text-gray-600">${{product.variants[0].price}}</p>
              </div>
            </router-link>
          </div>

          <Pagination v-show="filteredProducts.length > postsPerItem" previous="Prev" next="Next" :postsPerItem=this.postsPerItem :totalItems="filteredProducts.length" :currentPage=this.currentPage @paginate-event="paginate" />
          
        
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from "@/components/Pagination"
export default {
  name: "ProductList",
  components: {
    Pagination
  },
  data(){
    return {
      isLoading: true,
      urlIdLookup: {},
      currentPage: 1,
      postsPerItem: 9,
      search: '',
    }
  },
  created(){
    this.urlIdLookup = this.$store.state.products.reduce((acc, cur, idx)=> 
          acc = {...acc, [cur.id]:cur.id }
      ,{})
  },
  methods: {
    paginate(pageNumber){
      this.currentPage = pageNumber
    },
    onFilter(event){
      const availebleParams = this.$route.query;
      this.$router.replace({query: { ...availebleParams, sort: event.target.value}})
    },
    onRemoveFilter(){
      this.$router.replace({name: "Home"})
    }
  },
  computed: {
    ...mapState(['products']),
    filteredProducts(){
        this.currentPage = 1;
        let products = this.products;
        if(this.$route.query.sort === "title-desc"){
          products = products.sort((a, b) => a.title > b.title && -1)
        } else if(this.$route.query.sort === "title-asc"){
          products = products.sort((a, b) => a.title.localeCompare(b.title))
        } else if(this.$route.query.sort === "price-asc"){
          products = products.sort((a, b) => parseFloat(a.variants[0].price) - parseFloat(b.variants[0].price));
        } else if(this.$route.query.sort === "price-desc"){
          products = products.sort((a, b) => parseFloat(b.variants[0].price) - parseFloat(a.variants[0].price));
        }

        return products.filter(product => product.title.toUpperCase().indexOf(this.search.toUpperCase()) > -1)
        },
        slideProduct(){
          const indexOfLastItem = this.currentPage * this.postsPerItem;
          const indexOfFirstItem = indexOfLastItem - this.postsPerItem;
          const currentItem = this.filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
          return currentItem
        },
  }
}
</script>