<script setup>
import { storeToRefs } from 'pinia'
import InfoCard from '../components/InfoCard.vue'
import { useSalesStore } from '../stores/salesStore'
import { onMounted } from 'vue'
import PieChart from '../components/PieChart.vue'
import BarChart from '../components/BarChart.vue'

const salesStore = useSalesStore()
const { getSales } = salesStore
const { sales } = storeToRefs(salesStore)
const labels = ['Karategis', 'Protecciones', 'Cinturones']
const series = [58, 15, 27]
const seriesBar = [
  {
    name: 2023,
    data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2]
  },
  {
    name: 2024,
    data: [2, 3, 2, 1]
  }
]

onMounted(async () => {
  await getSales()
})
</script>

<template>
  <main class="m-4 w-full">
    <div class="bg-white shadow-md p-6 rounded-xl">
      <h2 class="text-darkBlue font-roboto-black font-black text-3xl pb-4">Últimos 30 días</h2>
      <div
        class="grid grid-cols-4 grid-rows-1 w-fll gap-4 *:font-roboto-black *:font-black *:bg-white *:shadow-md *:p-6 *:rounded-xl"
      >
        <InfoCard
          title="VENTAS"
          subtitle="63.00 €"
          class="flex flex-col justify-center items-center text-darkBlue"
        />
        <InfoCard
          title="VENTAS AÑO ANTERIOR"
          subtitle="22.00 €"
          class="flex flex-col justify-center items-center text-darkBlue"
        />
        <InfoCard
          title="BENEFICIOS"
          subtitle="28.00 €"
          class="flex flex-col justify-center items-center text-[#0D5402]"
        />
        <InfoCard
          title="COSTE DE PRODCUTO"
          subtitle="35.00 €"
          class="flex flex-col justify-center items-center text-darkBlue"
        />
      </div>
    </div>
    <section class="flex gap-4 mt-4 h-[245px]">
      <article class="bg-white shadow-md rounded-xl w-[70%] p-6 relative">
        <h2 class="text-darkBlue font-roboto-black font-black text-3xl pb-4">
          Ventas en el último año
        </h2>
        <BarChart
          :seriesInputs="seriesBar"
          :widthChart="1100"
          :heigthChart="200"
          positionInput="top"
          :offsetYInput="10"
          :scaleInput="0.7"
          class="absolute top-10"
        />
      </article>
      <article class="bg-white shadow-md rounded-xl w-[30%] p-6 relative">
        <h2 class="text-darkBlue font-roboto-black font-black text-3xl pb-4 w-1/2">
          Categorías más vendidas
        </h2>
        <PieChart
          :labelsInputs="labels"
          :seriesInputs="series"
          :widthChart="420"
          :heigthChart="250"
          positionInput="left"
          :offsetYInput="100"
          :scaleInput="0.7"
          class="absolute z-[1] top-0 right-0"
        />
      </article>
    </section>
    <article class="bg-white shadow-md rounded-xl mt-4">
      <h2 class="text-darkBlue font-roboto-black font-black text-3xl py-4 pl-6">Últimas ventas</h2>
      <div class="flex-1 last:rounded-xl w-full h-[300px] overflow-y-auto">
        <table class="text-black w-full">
          <thead>
            <th class="text-left pb-4 pl-6">Nombre del producto</th>
            <th class="pb-4 text-center">Fecha de venta</th>
            <th class="pb-4">Nº de recibo</th>
            <th class="pb-4">Precio</th>
            <th class="pb-4 pr-6">Nombre del socio</th>
          </thead>
          <tbody>
            <tr
              class="h-[70px]"
              v-for="(sale, index) in sales"
              :key="sale.id"
              :class="index % 2 === 0 ? 'bg-backgroundTable' : 'bg-white'"
            >
              <td class="pl-6">{{ sale.product_name }}</td>
              <td class="text-center">{{ sale.purchase_date }}</td>
              <td class="text-center">{{ sale.receipt_number }}</td>
              <td class="text-center">{{ sale.total_price }}.00 €</td>
              <td class="text-center pr-6">{{ sale.buyer_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </main>
</template>
