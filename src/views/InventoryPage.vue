<script setup>
import WelcomeCard from '../components/WelcomeCard.vue'
import { onMounted, ref, computed } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { storeToRefs } from 'pinia'
import IconComponent from '../components/icons/IconComponent.vue'
import { router } from '../router/index.js'

const inventoryStore = useInventoryStore()
const { getProducts, getCategoryProducts, countStockByCategory, deleteProduct, addProduct } =
  inventoryStore
const { categoryProducts, products, counterCategories } = storeToRefs(inventoryStore)

const hovered = ref(false)
const searchItem = ref('')
const deleteOpen = ref(false)
const deletProduct = ref('')
const productId = ref(0)
const addModalOpen = ref(false)
const formValues = ref({
  title: '',
  description: '',
  price: 0,
  'cost-price': 0,
  supplier: '',
  stock: 0,
  'min-stock': 0,
  durability: 0,
  category: '',
  image: ''
})
const previewImg = ref('')

onMounted(async () => {
  await getProducts()
  getCategoryProducts()
  countStockByCategory(products.value)
})

const filteredProducts = computed(() => {
  const value = searchItem.value?.toLowerCase().trim()
  const actualProducts = products.value.filter((product) =>
    product.title?.toLowerCase().includes(value)
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

const showAddModal = () => {
  addModalOpen.value = true
}

const getImage = (e) => {
  formValues.value.image = e.target.files[0]
  previewImg.value = URL.createObjectURL(formValues.value.image)
}

const resetForm = () => {
  formValues.value = {
    title: '',
    description: '',
    price: 0,
    'cost-price': 0,
    supplier: '',
    stock: 0,
    'min-stock': 0,
    durability: 0,
    category: '',
    image: ''
  }
  previewImg.value = ''
}

const submitForm = () => {
  addProduct(formValues.value)
  addModalOpen.value = false
  resetForm()
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
          @click="showAddModal()"
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
      <div class="flex-1 last:rounded-xl w-full h-[530px] overflow-y-auto">
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
          <tbody class="even:bg-backgroundTable">
            <tr
              class="h-[70px] cursor-pointer"
              v-for="product in filteredProducts"
              :key="product.id"
              @click="router.push('/' + product.id)"
            >
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
          v-if="addModalOpen"
          class="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
        >
          <div
            class="bg-white p-8 rounded-md shadow-md w-3/5 h-[90%] flex flex-col justify-around gap-4"
          >
            <form
              class="flex flex-col *:text-darkBlue *:font-roboto-bold gap-4"
              @submit.prevent="submitForm"
            >
              <label for="title" class="font-bold flex flex-col gap-2">
                Nombre del producto
                <input
                  v-model="formValues.title"
                  type="text"
                  name="title"
                  class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                />
              </label>
              <label for="description" class="font-bold flex flex-col gap-2">
                Descripción
                <textarea
                  v-model="formValues.description"
                  type="text"
                  name="description"
                  class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal resize-none"
                  rows="5"
                ></textarea>
              </label>
              <div class="flex gap-6 *:gap-2">
                <label for="price" class="font-bold flex flex-col">
                  Precio de venta
                  <input
                    v-model="formValues.price"
                    type="number"
                    name="price"
                    class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                  />
                </label>
                <label for="cost-price" class="font-bold flex flex-col">
                  Precio de costo
                  <input
                    v-model="formValues['cost-price']"
                    type="number"
                    name="cost-price"
                    class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                  />
                </label>
              </div>
              <label for="supplier" class="font-bold flex flex-col gap-2">
                Proveedor
                <input
                  v-model="formValues.supplier"
                  type="text"
                  name="supplier"
                  class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                />
              </label>
              <div class="flex gap-6 *:gap-2">
                <label for="stock" class="font-bold flex flex-col">
                  Cantidad en stock
                  <input
                    v-model="formValues.stock"
                    type="number"
                    name="stock"
                    class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                  />
                </label>
                <label for="min-stock" class="font-bold flex flex-col">
                  Mínimo de stock deseado
                  <input
                    v-model="formValues['min-stock']"
                    type="number"
                    name="min-stock"
                    class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                  />
                </label>
                <label for="durability" class="font-bold flex flex-col">
                  Durabilidad en meses
                  <input
                    v-model="formValues.durability"
                    type="number"
                    name="durability"
                    max="12"
                    class="bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl font-normal"
                  />
                </label>
              </div>
              <label for="category" class="font-bold flex flex-col gap-2">
                Categoría
                <select
                  v-model="formValues.category"
                  name="category"
                  id="category"
                  class="font-normal bg-white focus:outline-none shadow-inner shadow-lightBlue py-2 px-4 rounded-xl"
                >
                  <option value="Karategis" class="bg-white">Karategis</option>
                  <option value="Cinturones" class="bg-white">Cinturones</option>
                  <option value="Protecciones" class="bg-white">Protecciones</option>
                </select>
              </label>
              <div class="flex gap-4">
                <label
                  htmlFor="photo"
                  className="flex gap-4 border border-darkBlue py-2 px-6 rounded-2xl font-bold text-darkBlue cursor-pointer w-[330px]"
                >
                  AÑADIR FOTO DEL PRODUCTO
                  <IconComponent name="photo" :hovered="(hovered = true)" />
                  <input
                    @change="getImage"
                    className="hidden w-full cursor-pointer mt-2 text-sm font-medium"
                    id="photo"
                    type="file"
                    name="photo"
                  />
                </label>
                <img
                  v-if="previewImg"
                  :src="previewImg"
                  alt="Previsualización de la imagen"
                  class="w-12 h-12"
                />
              </div>
              <div class="self-center flex gap-9">
                <button
                  type="submit"
                  class="rounded-xl border border-darkBlue px-8 py-4 text-darkBlue font-bold hover:bg-darkBlue hover:text-white"
                >
                  CONFIRMAR
                </button>
                <button
                  type="button"
                  @click="(addModalOpen = false), resetForm()"
                  class="rounded-xl border border-red bg-red px-8 py-4 text-white font-bold hover:bg-white hover:text-red"
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
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
