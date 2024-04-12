<script setup>
import { storeToRefs } from 'pinia'
import { useReceiptsStore } from '@/stores/receiptsStore'
import { onMounted } from 'vue'
import IconComponent from './icons/IconComponent.vue'

defineProps({
  seeReceipt: {
    type: Boolean
  }
})

const emits = defineEmits(['closeModal'])

const receiptStore = useReceiptsStore()
const { getReceipts, getReceipt } = receiptStore
const { receiptSelected } = storeToRefs(receiptStore)

const closeReceipt = () => {
  emits('closeModal')
}

onMounted(async () => {
  await getReceipts()
  getReceipt(receiptSelected.value.receipt_number)
})
</script>

<template>
  <aside class="rounded-xl *:text-white relative">
    <IconComponent
      name="plus"
      class="rotate-45 absolute right-0 cursor-pointer"
      :width="36"
      :height="36"
      fill="#f5f5f5"
      stroke="#f5f5f5"
      @click.prevent="closeReceipt"
    />
    <div class="flex gap-28 mb-4">
      <div class="flex flex-col">
        <p><span class="font-roboto-bold font-bold">Razón social:</span> Kaizen Karate Club</p>
        <p>
          <span class="font-roboto-bold font-bold">Dirección: </span>{{ receiptSelected.address }}
        </p>
        <p>
          <span class="font-roboto-bold font-bold">Datos de contacto: </span
          >{{ receiptSelected.phone }}
        </p>
      </div>
      <div class="flex flex-col">
        <p><span class="font-roboto-bold font-bold">NIF/CIF: </span>{{ receiptSelected.cif }}</p>
        <p>
          <span class="font-roboto-bold font-bold">Nº de recibo: </span
          >{{ receiptSelected.receipt_number }}
        </p>
        <p>
          <span class="font-roboto-bold font-bold">Fecha de emisión: </span
          >{{ receiptSelected.date_issue }}
        </p>
      </div>
    </div>
    <div class="flex flex-col mb-4">
      <p>
        <span class="font-roboto-bold font-bold">Recibí de: </span
        >{{ receiptSelected.paying_partner }}
      </p>
      <p>
        <span class="font-roboto-bold font-bold">La cantidad de: </span
        >{{ receiptSelected.total_price }}.00 €
      </p>
      <p>
        <span class="font-roboto-bold font-bold">En concepto de: </span
        >{{ receiptSelected.concept }}
      </p>
    </div>
    <div class="flex flex-col items-end">
      <p class="text-2xl">
        <span class="font-roboto-bold font-bold text-lg">TOTAL: </span>{{ receiptSelected.price }} €
      </p>
      <p class="text-2xl">
        <span class="font-roboto-bold font-bold text-lg">IVA 21%: </span
        >{{ receiptSelected.total_price }}.00 €
      </p>
    </div>
  </aside>
</template>
