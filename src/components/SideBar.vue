<script setup>
import IconComponent from './icons/IconComponent.vue'
import { ref, onMounted } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore.js'
import { storeToRefs } from 'pinia'

const inventoryStore = useInventoryStore()
const { getProducts, alertProductStock } = inventoryStore
const { products, alertStock } = storeToRefs(inventoryStore)

const hoveredAvatar = ref(false)
const hoveredSettings = ref(false)
const hoveredPower = ref(false)

onMounted(async () => {
  await getProducts()
  alertProductStock(products.value)
})
</script>

<template>
  <header
    class="min-w-[264px] h-screen flex flex-col justify-between bg-white shadow-md shadow-right"
  >
    <div>
      <div class="flex justify-between p-4">
        <img src="../assets/organiclub.webp" alt="Logo corporativo" class="w-32" />
        <IconComponent name="menu" :height="24" :width="24" />
      </div>
      <nav>
        <ul class="*:font-roboto-medium *:font-semibold *:text-darkBlue">
          <li title="Inventario" class="hover:bg-lightBlue bg-lightBlue">
            <RouterLink to="/" class="flex items-center gap-3 p-4 cursor-pointer selected relative">
              <IconComponent name="inventory" :height="24" :width="24" />
              <div
                v-if="alertStock"
                class="w-2 h-2 bg-red rounded-full absolute top-1/2 transform -translate-y-1/2 right-5"
              ></div>
              Inventario
            </RouterLink>
          </li>
          <li
            title="Gestión de ventas"
            class="hover:bg-lightBlue flex items-center gap-3 p-4 cursor-pointer"
          >
            <RouterLink to="/sales" class="flex items-center gap-3 cursor-pointer relative w-full">
              <IconComponent name="sell" :height="24" :width="24" />
              Gestión de ventas
            </RouterLink>
          </li>
          <li title="Recibos" class="hover:bg-lightBlue flex items-center gap-3 p-4 cursor-pointer">
            <RouterLink
              to="/receipts"
              class="flex items-center gap-3 cursor-pointer relative w-full"
            >
              <IconComponent name="receipt" :height="24" :width="24" />
              Recibos
            </RouterLink>
          </li>
          <li title="Pedidos" class="hover:bg-lightBlue flex items-center gap-3 p-4 cursor-pointer">
            <IconComponent name="cart" :height="24" :width="24" />
            Pedidos
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <ul>
        <li
          title="Perfil"
          class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue"
          @mouseover="hoveredAvatar = true"
          @mouseleave="hoveredAvatar = false"
        >
          <button>
            <IconComponent name="avatar" :height="24" :width="24" :hovered="hoveredAvatar" />
            Perfil
          </button>
        </li>
        <li
          title="Configuración"
          class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue"
          @mouseover="hoveredSettings = true"
          @mouseleave="hoveredSettings = false"
        >
          <button>
            <IconComponent name="settings" :height="24" :width="24" :hovered="hoveredSettings" />
            Configuración
          </button>
        </li>
        <li
          title="Cerrar sesión"
          class="*:font-roboto-medium *:font-semibold *:text-menuNav *:flex *:items-center *:gap-3 *:p-4 *:hover:text-darkBlue"
          @mouseover="hoveredPower = true"
          @mouseleave="hoveredPower = false"
        >
          <button>
            <IconComponent name="powerSettings" :height="24" :width="24" :hovered="hoveredPower" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.selected::after {
  content: '';
  width: 4px;
  height: 3.5rem;
  position: absolute;
  right: 0;
  background-color: #293b66;
}
</style>
