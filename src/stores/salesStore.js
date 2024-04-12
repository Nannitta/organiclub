import { getSalesService } from '@/services'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSalesStore = defineStore('Salesstore', () => {
  const sales = ref([])

  const getSales = async () => {
    sales.value = await getSalesService()
  }

  return {
    getSales,
    sales
  }
})
