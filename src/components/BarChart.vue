<template>
  <div class="example">
    <apexcharts
      :width="this.widthChart"
      :height="this.heightChart"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

const leyendColors = ['#263652', '#507CB8']

export default {
  name: 'ChartBar',
  props: {
    seriesInputs: {
      type: Array
    },
    widthChart: {
      type: Number,
      default: 350
    },
    heightChart: {
      type: Number,
      default: 200
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
        plotOptions: {
          pie: {
            customScale: this.scaleInput,
            bar: {
              horizontal: false
            }
          }
        },
        xaxis: {
          categories: [
            'Ene',
            'Feb',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul',
            'Ago',
            'Sep',
            'Oct',
            'Nov',
            'Dic'
          ]
        }
      },
      series: this.seriesInputs
    }
  }
}
</script>
