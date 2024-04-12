<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '../stores/inventoryStore'
import IconComponent from '../components/icons/IconComponent.vue'
import InfoCard from '../components/InfoCard.vue'
import PieChart from '../components/PieChart.vue'

const productStore = useProductStore()
const { getSuppliers, getSupplierByProduct, getProduct, getClients, editProduct } = productStore
const { supplierProduct, productSelected, clients, clientStatus } = storeToRefs(productStore)
const inventoryStore = useInventoryStore()
const { getProducts } = inventoryStore
const route = useRoute()
const editModalOpen = ref(false)
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
const labels = ref(['Pendiente', 'Falta menos de 1 mes', 'En buen estado'])
const series = ref([50, 10, 40])

const getInitialData = async () => {
  await getProducts()
  await getSuppliers()
  await getClients()
}

onMounted(async () => {
  await getInitialData()
  getSupplierByProduct(route.params.idProduct)
  getProduct(route.params.idProduct)
})

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

const getImage = (e) => {
  formValues.value.image = e.target.files[0]
  previewImg.value = URL.createObjectURL(formValues.value.image)
}

const submitForm = () => {
  console.log('aqui')
  editProduct(formValues.value)
  editModalOpen.value = false
  resetForm()
}
</script>

<template>
  <main class="w-full mt-4">
    <section class="flex ml-4 gap-4">
      <article
        class="bg-gradient-to-tl from-[#12539fb8] to-darkBlue p-6 rounded-xl shadow-xl *:text-white flex min-w-[30.3%]"
      >
        <div class="w-full flex flex-col gap-1">
          <h2 class="font-roboto-black font-black text-2xl">{{ supplierProduct.name }}</h2>
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
      <article
        class="bg-gradient-to-tl from-[#E0D1D1] to-[#F64848] w-[23%] p-6 rounded-xl *:text-white flex h-44 shadow-sm items-center justify-between"
      >
        <div class="flex flex-col">
          <h2 class="font-roboto-black font-black text-2xl">STOCK ACTUAL</h2>
          <p>Min: {{ productSelected['min-stock'] }}</p>
          <span class="font-roboto-black font-black text-[64px]">{{ productSelected.stock }}</span>
        </div>
        <button class="w-[70px] h-[70px] bg-white flex items-center justify-center rounded-full">
          <IconComponent name="plus" fill="#FD7878" :width="32" :height="32" stroke="#FD7878" />
        </button>
      </article>
      <InfoCard
        title="PRECIO DE COSTE"
        :subtitle="productSelected['cost-price'] + '.00 €'"
        class="text-darkBlue w-[23%] bg-white shadow-md rounded-xl flex flex-col items-center justify-center font-black font-roboto-black"
      />
      <InfoCard
        title="PRECIO DE VENTA"
        :subtitle="productSelected.price + '.00 €'"
        class="text-darkBlue w-[23%] bg-white shadow-md rounded-xl flex flex-col items-center justify-center font-black font-roboto-black mr-4"
      />
    </section>
    <div class="flex grow">
      <div class="ml-4 flex flex-col w-[30%]">
        <article
          class="bg-white rounded-xl p-6 mt-4 flex justify-center items-center gap-6 shadow-md relative"
        >
          <img :src="productSelected.image" alt="Foto del producto" class="w-20 h-w-20" />
          <div class="flex flex-col">
            <h2 class="font-roboto-bold font-bold text-2xl mb-2">{{ productSelected.title }}</h2>
            <span class="font-roboto-thin font-light text-sm mb-2">{{
              productSelected.supplier
            }}</span>
            <span
              class="font-roboto-regular text-sm text-darkBlue px-3 py-1 bg-lightBlue border border-darkBlue rounded-md w-fit mb-4"
              >{{ productSelected.category }}</span
            >
            <p class="text-sm mb-9">{{ productSelected.description }}</p>
            <p class="text-xs">
              <span class="text-xs font-roboto-bold font-bold">Vida útil: </span
              >{{ productSelected.durability }} meses
            </p>
            <div class="absolute flex flex-col right-6 gap-2">
              <button
                @click="editModalOpen = true"
                class="p-[2px] w-9 h-w-9 flex items-center justify-center rounded-lg border bg-lightBlue border-darkBlue"
              >
                <IconComponent name="edit" :width="18" :height="18" />
              </button>
            </div>
          </div>
        </article>
        <article class="bg-white mt-4 flex-1 p-6 rounded-xl shadow-md">
          <h2 class="font-roboto-bold font-bold text-3xl text-darkBlue mb-4">Gráfica de estados</h2>
          <PieChart
            :labelsInputs="labels"
            :seriesInputs="series"
            :widthChart="450"
            :heigthChart="350"
          />
        </article>
      </div>
      <div class="bg-white rounded-xl shadow-md mt-4 mx-4 flex-1 h-[730px]">
        <h2 class="font-roboto-bold font-bold text-3xl text-darkBlue pt-6 pl-6 mb-4">Socios</h2>
        <div class="flex-1 last:rounded-xl w-full h-[640px] overflow-y-auto">
          <table class="text-black w-full">
            <thead>
              <th class="text-left pb-4 pl-6">Nombre</th>
              <th class="pb-4 w-32 text-center">Contacto</th>
              <th class="pb-4 w-52">Fecha de compra</th>
              <th class="pb-4 w-52">Fecha de renovación</th>
              <th class="pb-4 w-40">Estado</th>
              <th class="pb-4"></th>
            </thead>
            <tbody class="even:bg-backgroundTable">
              <tr
                class="h-[70px]"
                v-for="(client, index) in clients"
                :key="client.id"
                :class="index % 2 === 0 ? 'bg-backgroundTable' : 'bg-white'"
              >
                <td class="pl-6">{{ client.first_name }} {{ client.last_name }}</td>
                <td class="text-center">{{ client.contact }}</td>
                <td class="text-center">{{ client.purchase_date }}</td>
                <td class="text-center">{{ client.renewal_date }}</td>
                <td>
                  <div
                    :class="
                      clientStatus[index] === 'Pendiente'
                        ? 'text-red border border-red p-1 bg-[#F5D8D8] text-center rounded-md'
                        : clientStatus[index] === 'En buen estado'
                          ? 'text-[#0D5402] border border-[#0D5402] p-1 bg-[#C9ECC4] text-center rounded-md'
                          : 'text-orange border border-orange p-1 bg-[#F1E2C5] text-center rounded-md'
                    "
                  >
                    {{ clientStatus[index] }}
                  </div>
                </td>
                <td class="text-right pr-6">
                  <button>
                    <IconComponent name="basket" :width="24" :height="24" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      v-if="editModalOpen"
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
              @click="(editModalOpen = false), resetForm()"
              class="rounded-xl border border-red bg-red px-8 py-4 text-white font-bold hover:bg-white hover:text-red"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
