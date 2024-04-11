<script setup>
import WelcomeCard from '../components/WelcomeCard.vue'
import { onMounted, ref } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { storeToRefs } from 'pinia'
import IconComponent from '../components/icons/IconComponent.vue'

const inventoryStore = useInventoryStore()
const { getProducts, getCategoryProducts, countStockByCategory } = inventoryStore
const { categoryProducts, products, counterCategories } = storeToRefs(inventoryStore)

const hovered = ref(true)

onMounted(async () => {
  await getProducts()
  getCategoryProducts()
  countStockByCategory(products.value)
})
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
                v-if="category === 'Karateguis'"
                class="w-2 h-2 bg-[#DF0E0E] rounded-full absolute top-1/2 transform -translate-y-1/2 left-0"
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
          class="font-roboto-black font-black text-darkBlue flex items-center gap-3 p-4 bg-orange rounded-lg shadow-xl"
        >
          AÑADIR PRODUCTO <IconComponent name="plus" :width="16" :heigth="16" :hovered="hovered" />
        </button>
        <input
          type="text"
          placeholder="Buscador de productos"
          class="mt-7 bg-white border-b border-menuNav w-full pb-2 placeholder-menuNav focus:outline-none"
        />
      </div>
      <div class="overflow-hidden flex-1 last:rounded-xl overflow-y-auto">
        <table class="text-black w-full">
          <thead>
            <th class="pb-4"></th>
            <th class="w-[412px] text-left pb-4">Nombre</th>
            <th class="w-[550px] text-left pb-4">Descripción</th>
            <th class="w-36 pb-4">Categoría</th>
            <th class="w-36 pb-4">Precio</th>
            <th class="w-36 pb-4">Stock disponible</th>
            <th class="pb-4"></th>
          </thead>
          <tbody v-for="product in products" :key="product.id" class="even:bg-backgroundTable">
            <tr class="h-[70px]">
              <td class="w-[84px] px-6 relative">
                <div
                  v-if="product.title === 'Karategi negro'"
                  class="w-2 h-2 bg-[#DF0E0E] rounded-full absolute z-[1] top-1/2 transform -translate-y-1/2 left-[6px]"
                ></div>
                <img :src="product.image" alt="Imagen del producto" class="w-12 h-12" />
              </td>
              <td>{{ product.title }}</td>
              <td>{{ product.description }}</td>
              <td class="text-center">{{ product.category }}</td>
              <td class="text-center">{{ product.price }}.00 €</td>
              <td class="text-center">{{ product.stock }}</td>
              <td class="text-right pr-6">
                <button>
                  <IconComponent name="dots" :width="24" :height="24" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>
