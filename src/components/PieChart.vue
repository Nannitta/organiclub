<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'StateChart',
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        chart: {
          type: 'donut'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<template>
  <div class="example">
    <apexcharts height="350" :options="chartOptions"></apexcharts>
  </div>
</template>
