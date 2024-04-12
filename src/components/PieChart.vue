<template>
  <div class="example">
    <apexcharts
      width="450"
      height="340"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
const leyendColors = ['#263652', '#EBAD31', '#507CB8']

export default {
  name: 'ChartDonut',
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {
      chartOptions: {
        dataLabels: {
          background: {
            enabled: false
          },
          dropShadow: {
            enabled: false
          }
        },
        colors: leyendColors,
        legend: {
          position: 'top',
          offsetY: 1
        },
        labels: ['En buen estado', 'Falta menos de 1 mes', 'Pendiente'],
        plotOptions: {
          pie: {
            customScale: 1
          }
        }
      },

      series: [50, 10, 40]
    }
  }
}
</script>
