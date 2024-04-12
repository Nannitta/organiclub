import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { getSuppliersService, getClientsService } from '../services/index.js'
import { useInventoryStore } from './inventoryStore.js'

export const useProductStore = defineStore('Productstore', () => {
  const inventoryStore = useInventoryStore()
  const { products } = storeToRefs(inventoryStore)
  const suppliers = ref([])
  const supplierProduct = ref('')
  const supplierName = ref('')
  const productSelected = ref({})
  const clients = ref([])
  const clientStatus = ref([])

  const getSuppliers = async () => {
    suppliers.value = await getSuppliersService()
  }

  const getClients = async () => {
    clients.value = await getClientsService()
    clientStatus.value = checkDates()
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

  const getProduct = (productId) => {
    products.value.forEach((product) => {
      if (+product.id === +productId) {
        productSelected.value = product
      }
    })
  }

  const checkDates = () => {
    const today = new Date()
    const result = []

    clients.value.forEach((client) => {
      const renewalDate = new Date(client.renewal_date)
      const diffTime = renewalDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (today > renewalDate) {
        result.push('Pendiente')
      } else if (diffDays <= 30) {
        result.push(`Faltan ${diffDays} días`)
      } else {
        result.push('En buen estado')
      }
    })

    return result
  }

  const editProduct = (product) => {
    productSelected.value = {
      title: product.title,
      description: product.description,
      price: product.price,
      'cost-price': product['cost-price'],
      supplier: product.supplier,
      stock: product.stock,
      'min-stock': product['min-stock'],
      durability: product.durability,
      category: product.category,
      image: product.image
    }
  }

  return {
    getSuppliers,
    supplierProduct,
    suppliers,
    getSupplierByProduct,
    getProduct,
    productSelected,
    getClients,
    clients,
    checkDates,
    clientStatus,
    editProduct
  }
})
