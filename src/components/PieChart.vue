<template>
  <div class="example">
    <apexcharts
      :width="this.widthChart"
      :height="this.heightChart"
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
  props: {
    labelsInputs: {
      type: Array
    },
    seriesInputs: {
      type: Array
    },
    widthChart: {
      type: Number,
      default: 350
    },
    heightChart: {
      type: Number,
      default: 350
    },
    positionInput: {
      type: String,
      default: 'top'
    },
    scaleInput: {
      type: Number,
      default: 1
    },
    offsetYInput: {
      type: Number,
      default: 1
    }
  },
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
          position: this.positionInput,
          offsetY: this.offsetYInput
        },
        labels: this.labelsInputs,
        plotOptions: {
          pie: {
            customScale: this.scaleInput
          }
        }
      },
      series: this.seriesInputs
    }
  }
}
</script>
