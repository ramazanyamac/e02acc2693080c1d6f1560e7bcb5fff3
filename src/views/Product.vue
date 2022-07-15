<template>
  <Loading v-if="isLoading"/>
  <section v-else>
    <div class="relative max-w-screen-xl px-4 py-8 mx-auto">
      <div class="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
        <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
          <div class="aspect-w-1 aspect-h-1">
            <img alt="Mobile Phone Stand" class="object-cover rounded-xl" :src="product[0].image.src"/>
          </div>
        </div>

        <div class="sticky top-0">
          <div class="flex justify-between mt-8">
            <div class="max-w-[35ch]">
              <h1 class="text-2xl font-bold">{{product[0].title}}</h1>

              <p class="mt-0.5 text-sm">{{product[0].tags}}</p>

              <div class="flex mt-2 -ml-0.5">
                <svg
                  class="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  class="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  class="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  class="w-5 h-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  class="w-5 h-5 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            <p class="text-lg font-bold">${{product[0].variants[0].price}}</p>
          </div>

          <form class="mt-8">
            <fieldset v-for="(option, index) in product[0].options" :key="index" class="mt-4">
              <legend class="mb-1 text-sm font-medium">{{option.name}}</legend>

              <div class="flow-root">
                <div class="flex flex-wrap -m-0.5">
                  <label :for="option.name+index" class="cursor-pointer p-0.5" v-for="(value, index) in option.values" :key="index">
                    <input type="radio" name="color" :id="option.name+index" class="sr-only peer" />

                    <span class="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                      {{value}}
                    </span>
                  </label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
import Loading from "@/components/Loading"
import { productRequest } from "@/services/productAPI";
import { useRoute } from 'vue-router';
export default {
  name: 'Product',
  components: {
    Loading
  },
  data(){
    return {
      product: null,
      isLoading: true,
    }
  },
  async created(){
      const route = useRoute();
      const slug = route.params.slug;
      const data = await productRequest();
      this.product = data.products.filter(product => product.id == slug)
      this.isLoading = data?.false
  }
}
</script>