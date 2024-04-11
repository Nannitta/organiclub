import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { getSuppliersService } from '../services/index.js'
import { useInventoryStore } from './inventoryStore.js'

export const useProductStore = defineStore('Productstore', () => {
  const inventoryStore = useInventoryStore()
  const { products } = storeToRefs(inventoryStore)
  const suppliers = ref([])
  const supplierProduct = ref('')
  const supplierName = ref('')

  const getSuppliers = async () => {
    suppliers.value = await getSuppliersService()
  }

  const getSupplierByProduct = (productId) => {
    products.value.forEach((product) => {
      if (+productId === product.id) {
        supplierName.value = product.supplier
      }
    })

    suppliers.value.forEach((supplier) => {
      if (supplier.name === supplierName.value) {
        supplierProduct.value = supplier
      }
    })
  }

  return {
    getSuppliers,
    supplierProduct,
    suppliers,
    getSupplierByProduct
  }
})
