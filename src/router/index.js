import { createRouter, createWebHistory } from 'vue-router'
import InventoryPage from '../views/InventoryPage.vue'
import ProductPage from '../views/ProductPage.vue'
import SalesPage from '../views/SalesPage.vue'
import ReceiptsPage from '../views/ReceiptsPage.vue'

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
    },
    {
      path: '/sales',
      component: SalesPage
    },
    {
      path: '/receipts',
      component: ReceiptsPage
    }
  ]
})
