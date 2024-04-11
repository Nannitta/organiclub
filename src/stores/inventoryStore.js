import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProductsService } from '../services/index.js'

export const useInventoryStore = defineStore('InventoryStore', () => {
  const products = ref([])
  const categoryProducts = ref([])
  const counterCategories = ref([])

  const getProducts = async () => {
    products.value = await getProductsService()
  }

  const getCategoryProducts = () => {
    const category = []

    products.value.forEach((product) => {
      category.push(product.category)
    })

    categoryProducts.value = new Set(category)
  }

  const countStockByCategory = (inventory) => {
    const counter = {}

    inventory.forEach((product) => {
      const category = product.category
      const stock = product.stock

      if (counter[category]) {
        counter[category] += stock
      } else {
        counter[category] = stock
      }
    })

    counterCategories.value = counter
  }

  return {
    products,
    getProducts,
    categoryProducts,
    getCategoryProducts,
    countStockByCategory,
    counterCategories
  }
})
