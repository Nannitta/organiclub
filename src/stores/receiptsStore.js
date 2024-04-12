import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getReceiptsService } from '../services/index.js'

export const useReceiptsStore = defineStore('ReceiptsStore', () => {
  const receipts = ref([])
  let receiptsLastMonth = ref(0)

  const getReceipts = async () => {
    receipts.value = await getReceiptsService()
  }

  const getMonthReceipts = () => {
    const currentDate = new Date()
    const actualYear = currentDate.getFullYear()
    const actualMonth = currentDate.getMonth()
    receiptsLastMonth.value = 0

    receipts.value.forEach((receipt) => {
      const receiptDate = new Date(receipt.date_issue)
      const receiptYear = receiptDate.getFullYear()
      const receiptMonth = receiptDate.getMonth()

      if (actualYear === receiptYear && actualMonth === receiptMonth) {
        receiptsLastMonth.value++
      }
    })
  }

  return { getReceipts, receipts, getMonthReceipts, receiptsLastMonth }
})
