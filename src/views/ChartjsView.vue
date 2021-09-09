<template>
  <div>
      <canvas class="statistics-charts-line" ref="lineChart" width="500" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    data() {
        return {
            Chart
        }
    },

    async created() {

    },

    async mounted() {
        await this.drawChart();
    },

    methods: {
        drawChart() {
            const chartCtx = this.$refs.lineChart.getContext('2d');
        }
    }
}
</script>

<style>

</style>