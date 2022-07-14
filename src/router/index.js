import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:slug',
    name: 'Product',
    component: () => import(/* webpackChunkName: "Product" */ '../views/Product.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "ErrorPage" */ '../views/ErrorPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
