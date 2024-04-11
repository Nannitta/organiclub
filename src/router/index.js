import { createRouter, createWebHistory } from 'vue-router'
import InventoryPage from '../views/InventoryPage.vue'
import ProductPage from '../views/ProductPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Inventory',
      component: InventoryPage
    },
    {
      path: '/:idProduct',
      component: ProductPage
    }
  ]
})
