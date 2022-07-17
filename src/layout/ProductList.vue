<template>
  <div class="lg:col-span-4">
          <div class="pt-2 pb-4 relative mx-auto text-gray-600">
            <input class="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type="search" name="search" placeholder="Search" v-model="search" autocomplete="off">
          </div>

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              <span class="hidden sm:inline"> Showing</span>
              {{slideProduct.length}} of {{products.length}} Products
            </p>

            <div class="ml-4">
              <label class="relative" for="sort">
                <span class="sr-only"> Sort </span>

                <select @change="onFilter" v-model="selected" class="py-3 pl-5 pr-10 text-xs font-medium border-gray-200 rounded-l-md hover:z-10 focus:outline-none focus:border-indigo-600 focus:z-10 hover:bg-gray-50 focus:ring-0">
                  <option readonly>Sort By</option>
                  <option v-for="(option, index) in options" :value="option.value" :key="index">
                    {{ option.text }}
                  </option>
                </select>
              </label>
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
import { mapGetters, mapState } from 'vuex'
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
      selected: 'Sort By',
      options: [
          { text: 'Title, A-Z', value: 'title-asc'},
          { text: 'Title, Z-A', value: 'title-desc'},
          { text: 'Price, Low-High', value: 'price-asc'},
          { text: 'Price, High-Low', value: 'price-desc'}
        ]
    }
  },
  created(){
    this.urlIdLookup = this.$store.state.products.reduce((acc, cur, idx)=> 
          acc = {...acc, [cur.id]:cur.id }
      ,{})
    this.selected = this.$route.query.sort ? this.$route.query.sort : this.selected
  },
  methods: {
    paginate(pageNumber){
      this.currentPage = pageNumber
    },
    onFilter(){
      const availebleParams = this.$route.query;
      this.$router.replace({query: { ...availebleParams, sort: event.target.value}})
    },
    onRemoveFilter(){
      this.$router.replace({name: "Home"})
    }
  },
  computed: {
    ...mapState(['products']),
    ...mapGetters([
      'sortProduct'
    ]),
    filteredProducts(){
        this.currentPage = 1;
        return this.sortProduct(this.$route.query.sort).filter(product => product.title.toUpperCase().indexOf(this.search.toUpperCase()) > -1)
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