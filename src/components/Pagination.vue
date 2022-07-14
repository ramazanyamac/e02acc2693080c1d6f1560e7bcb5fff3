<template>
    <ol class="flex justify-center space-x-1 text-xs font-medium mt-8">
      <li>
        <button @click="paginate(currentPage - 1)" :class="currentPage === 1 && 'pointer-events-none'" class="inline-flex items-center justify-center pl-5 pr-5 h-8 border border-gray-100 rounded">
          {{previous}}
        </button>
      </li>

      <li v-for="(data, index) in pageCount" :key="index" v-show="pageCount.length > 1">
        <button @click="paginate(data)" class="block w-8 h-8 leading-8 text-center border border-gray-100 rounded" :class="currentPage === data && 'bg-blue-600 text-white'">{{data}}</button>
      </li>

      <li>
        <button @click="paginate(currentPage + 1)" :class="currentPage === pageCount.length && 'pointer-events-none'" class="inline-flex items-center justify-center pl-5 pr-5 h-8 border border-gray-100 rounded">
          {{next}}
        </button>
      </li>
    </ol>
</template>

<script>
export default {
  name: 'Pagination',
  methods: {
    paginate(data){
        this.$emit('paginate-event', data)
    }
  },
  computed:{
    pageCount(){
      const pageNumbers = []
      for (let i = 1; i <= Math.ceil(this.totalItems / this.postsPerItem); i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    }
  },
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    postsPerItem: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    previous: {
      type: String,
      default: 'Previous'
    },
    next: {
      type: String,
      default: 'Next'
    },
  
  }
}
</script>