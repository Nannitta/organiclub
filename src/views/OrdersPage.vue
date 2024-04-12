<script setup>
import { storeToRefs } from 'pinia'
import InfoCard from '../components/InfoCard.vue'
import WelcomeCard from '../components/WelcomeCard.vue'
import { useOrdersStore } from '../stores/ordersStore.js'
import { onMounted, ref } from 'vue'
import IconComponent from '../components/icons/IconComponent.vue'

const ordersStore = useOrdersStore()
const { orders } = storeToRefs(ordersStore)
const { getOrders } = ordersStore
const hovered = ref(false)

onMounted(async () => {
  await getOrders()
})
</script>

<template>
  <main class="w-full mt-4">
    <div class="flex gap-4">
      <WelcomeCard section-name="resumen de pedidos" />
      <InfoCard
        title="MEDIA DE PEDIDOS MENSUAL"
        subtitle="4"
        class="bg-white shadow-md rounded-xl w-[30%] mr-4 flex flex-col justify-center items-center text-darkBlue font-roboto-black font-black"
      />
    </div>
    <div class="bg-white rounded-xl shadow-md mt-4 mx-4 flex-1 h-[500px] pt-6">
      <div class="ml-6">
        <button
          class="font-roboto-black font-black text-darkBlue flex items-center gap-3 p-4 bg-orange rounded-lg shadow-md hover:scale-105 hover:text-white"
          @mouseover="hovered = true"
          @mouseleave="hovered = false"
          title="Nuevo pedido"
        >
          NUEVO PEDIDO
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
      </div>
      <h2 class="font-roboto-bold font-bold text-3xl text-darkBlue pt-6 pl-6 mb-4">Socios</h2>
      <div class="flex-1 last:rounded-xl w-full h-[540px] overflow-y-auto">
        <table class="text-black w-full">
          <thead>
            <th class="text-left pb-4 pl-6">Vendedor</th>
            <th class="pb-4 w-32 text-center">Fecha de compra</th>
            <th class="pb-4 w-52">Nº pedido</th>
            <th class="pb-4 w-52">Coste</th>
            <th class="pb-4 w-40">Estado</th>
            <th class="pb-4 pr-6">Método de pago</th>
          </thead>
          <tbody class="even:bg-backgroundTable">
            <tr
              class="h-[70px]"
              v-for="(order, index) in orders"
              :key="order.orderId"
              :class="index % 2 === 0 ? 'bg-backgroundTable' : 'bg-white'"
            >
              <td class="pl-6">{{ order.seller }}</td>
              <td class="text-center">{{ order.date }}</td>
              <td class="text-center">{{ order.orderId }}</td>
              <td class="text-center">{{ order.cost }}.00 €</td>
              <td>
                <div
                  :class="
                    order.status === 'Pagado'
                      ? 'text-[#0D5402] border border-[#0D5402] p-1 bg-[#C9ECC4] text-center rounded-md'
                      : 'text-orange border border-orange p-1 bg-[#F1E2C5] text-center rounded-md'
                  "
                >
                  {{ order.status }}
                </div>
              </td>
              <td class="text-center pr-6">
                {{ order.payment_method }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
