<script setup>
import InfoCard from '../components/InfoCard.vue'
import WelcomeCard from '../components/WelcomeCard.vue'
import { storeToRefs } from 'pinia'
import { useReceiptsStore } from '../stores/receiptsStore'
import { onMounted } from 'vue'
import IconComponent from '../components/icons/IconComponent.vue'

const receiptsStore = useReceiptsStore()
const { getReceipts, getMonthReceipts } = receiptsStore
const { receipts, receiptsLastMonth } = storeToRefs(receiptsStore)

onMounted(async () => {
  await getReceipts()
  getMonthReceipts()
})
</script>
<template>
  <main class="w-full mt-4">
    <div class="flex w-full gap-4">
      <WelcomeCard section-name="lista de recibos" class="w-[70%]" />
      <InfoCard
        title="RECIBOS ESTE MES"
        :subtitle="receiptsLastMonth"
        class="bg-white shadow-md rounded-xl w-[30%] mr-4 flex flex-col items-center justify-center font-roboto-black font-black"
      />
    </div>
    <article class="bg-white my-4 h-[695px] shadow-md rounded-xl mx-4">
      <h2 class="text-darkBlue font-roboto-black font-black text-3xl py-4 pl-6">Últimos recibos</h2>
      <div class="flex-1 last:rounded-xl w-full h-[600px] overflow-y-auto">
        <table class="text-black w-full">
          <thead>
            <th class="text-left pb-4 pl-6 w-36">Nº de recibo</th>
            <th class="pb-4 text-center w-64">Socio pagador</th>
            <th class="pb-4 w-48">Fecha de emisión</th>
            <th class="pb-4 w-32">Cantidad</th>
            <th class="pb-4 pr-6 w-[500px] text-left">Concepto</th>
            <th class="w-12"></th>
            <th class="w-12"></th>
          </thead>
          <tbody>
            <tr
              class="h-[70px]"
              v-for="(receipt, index) in receipts"
              :key="receipt.receipt_number"
              :class="index % 2 === 0 ? 'bg-backgroundTable' : 'bg-white'"
            >
              <td class="pl-6">{{ receipt.receipt_number }}</td>
              <td class="text-center">{{ receipt.paying_partner }}</td>
              <td class="text-center">{{ receipt.date_issue }}</td>
              <td class="text-center">{{ receipt.total_price }}.00 €</td>
              <td class="text-left pr-6">{{ receipt.concept }}</td>
              <td title="Ver recibo"><IconComponent name="eye" class="cursor-pointer" /></td>
              <td class="pr-6" title="Imprimir recibo">
                <IconComponent name="print" class="cursor-pointer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </main>
</template>
