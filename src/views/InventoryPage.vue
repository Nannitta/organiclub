<script setup>
import WelcomeCard from '../components/WelcomeCard.vue'
import { onMounted, ref, computed } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { storeToRefs } from 'pinia'
import IconComponent from '../components/icons/IconComponent.vue'

const inventoryStore = useInventoryStore()
const { getProducts, getCategoryProducts, countStockByCategory, deleteProduct } = inventoryStore
const { categoryProducts, products, counterCategories } = storeToRefs(inventoryStore)

const hovered = ref(false)
const searchItem = ref('')
const deleteOpen = ref(false)
const deletProduct = ref('')
const productId = ref(0)

onMounted(async () => {
  await getProducts()
  getCategoryProducts()
  countStockByCategory(products.value)
})

const filteredProducts = computed(() => {
  const value = searchItem.value.toLowerCase().trim()
  const actualProducts = products.value.filter((product) =>
    product.title.toLowerCase().includes(value)
  )
  return actualProducts
})

const onChangeInput = (e) => {
  searchItem.value = e.target.value
}

const showDeleteConfirm = (product) => {
  deletProduct.value = product.title
  deleteOpen.value = true
  productId.value = product.id
}
</script>

<template>
  <main class="mt-4 w-full flex flex-col gap-4">
    <div class="flex gap-4">
      <WelcomeCard sectionName="stock de productos" />
      <article
        class="*:text-darkBlue *:text-2xl w-[30%] bg-gradient-to-bl from-orange to-[#ebad3180] mr-4 rounded-xl p-6 h-52 shadow-xl"
      >
        <h2 class="font-black text-right">STOCK TOTAL</h2>
        <div class="flex flex-col text-xl font-bold h-36 justify-around">
          <template v-for="category in categoryProducts" :key="category">
            <span class="pl-6 relative flex justify-between">
              <div
                v-if="category === 'Karategis'"
                class="w-2 h-2 bg-red rounded-full absolute top-1/2 transform -translate-y-1/2 left-0"
              ></div>
              {{ category }}
              <span>{{ counterCategories[category] }}</span>
            </span>
          </template>
        </div>
      </article>
    </div>
    <section class="mx-4 mb-4 bg-white rounded-xl flex-1 shadow-xl">
      <div class="p-6">
        <button
          class="font-roboto-black font-black text-darkBlue flex items-center gap-3 p-4 bg-orange rounded-lg shadow-md hover:scale-105 hover:text-white"
          @mouseover="hovered = true"
          @mouseleave="hovered = false"
          title="Añadir producto"
        >
          AÑADIR PRODUCTO
          <IconComponent
            name="plus"
            :width="16"
            :heigth="16"
            :hovered="hovered"
            fill="#293B66"
            fillHover="#F5F5F5"
            stroke="#293B66"
            strokeHover="#F5F5F5"
          />
        </button>
        <input
          type="text"
          placeholder="Buscador de productos"
          class="mt-7 bg-white border-b border-menuNav w-full pb-2 placeholder-menuNav focus:outline-none"
          v-model="searchItem"
          @input="onChangeInput"
        />
      </div>
      <div class="overflow-hidden flex-1 last:rounded-xl overflow-y-auto">
        <div v-if="filteredProducts.length === 0" class="pl-6 flex items-center gap-6">
          <img src="../assets/noProducts.webp" alt="Producto no encontrado" class="w-40" />
          <p>No hay ningún producto que coincida con tu búsqueda</p>
        </div>
        <table class="text-black w-full" v-if="filteredProducts.length > 0">
          <thead>
            <th class="pb-4"></th>
            <th class="w-[412px] text-left pb-4">Nombre</th>
            <th class="w-[550px] text-left pb-4">Descripción</th>
            <th class="w-36 pb-4">Categoría</th>
            <th class="w-36 pb-4">Precio</th>
            <th class="w-36 pb-4">Stock disponible</th>
            <th class="pb-4"></th>
          </thead>
          <tbody
            v-for="product in filteredProducts"
            :key="product.id"
            class="even:bg-backgroundTable"
          >
            <tr class="h-[70px]">
              <td class="w-[84px] px-6 relative">
                <div
                  v-if="product.stock < 5"
                  class="w-2 h-2 bg-red rounded-full absolute top-1/2 transform -translate-y-1/2 left-[6px]"
                ></div>
                <img :src="product.image" alt="Imagen del producto" class="w-12 h-12" />
              </td>
              <td>{{ product.title }}</td>
              <td>{{ product.description }}</td>
              <td class="text-center">{{ product.category }}</td>
              <td class="text-center">{{ product.price }}.00 €</td>
              <td class="text-center">{{ product.stock }}</td>
              <td class="text-right pr-6">
                <button @click="showDeleteConfirm(product)">
                  <IconComponent name="delete" :width="24" :height="24" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="deleteOpen"
          class="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
        >
          <div
            class="bg-white p-6 rounded-md shadow-md w-2/5 h-1/5 flex flex-col justify-around gap-4"
          >
            <p class="text-darkBlue font-roboto-black font-black text-2xl text-center text-balance">
              ¿Está seguro que desea eliminar {{ deletProduct }}?
            </p>
            <div class="self-center flex gap-9 mb-4">
              <button
                class="rounded-xl border border-darkBlue px-8 py-4 text-darkBlue font-bold hover:bg-darkBlue hover:text-white"
                @click="deleteProduct(productId), (deleteOpen = false)"
              >
                CONFIRMAR
              </button>
              <button
                class="rounded-xl border border-red bg-red px-8 py-4 text-white font-bold hover:bg-white hover:text-red"
                @click="deleteOpen = false"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
