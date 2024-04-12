import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getOrdersService } from '../services/index.js'

export const useOrdersStore = defineStore('OrdersStore', () => {
  const orders = ref([])

  const getOrders = async () => {
    orders.value = await getOrdersService()
  }

  return {
    getOrders,
    orders
  }
})
