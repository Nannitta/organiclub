<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '../stores/inventoryStore'

const productStore = useProductStore()
const { getSuppliers, getSupplierByProduct } = productStore
const { supplierProduct } = storeToRefs(productStore)
const inventoryStore = useInventoryStore()
const { getProducts } = inventoryStore
const route = useRoute()

const getInitialData = async () => {
  await getProducts()
  await getSuppliers()
}

onMounted(async () => {
  await getInitialData()
  getSupplierByProduct(route.params.idProduct)
})
</script>

<template>
  <main class="w-full mt-4">
    <article
      class="bg-gradient-to-tl from-[#12539fb8] to-darkBlue p-6 rounded-xl shadow-xl *:text-white flex w-[30%] ml-4"
    >
      <div class="w-full flex flex-col gap-1">
        <h1 class="font-roboto-black font-black text-2xl">{{ supplierProduct.name }}</h1>
        <p><span class="font-roboto-bold font-bold">CIF:</span> {{ supplierProduct.cif }}</p>
        <p><span class="font-roboto-bold font-bold">Email:</span> {{ supplierProduct.email }}</p>
        <p><span class="font-roboto-bold font-bold">Tlfono:</span> {{ supplierProduct.phone }}</p>
      </div>
      <div class="w-52 h-14">
        <img
          :src="supplierProduct.image"
          alt="Logo del proveedor"
          class="w-52 h-14 object-contain"
        />
      </div>
    </article>
  </main>
</template>
