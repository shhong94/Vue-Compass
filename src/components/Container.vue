<template>
  <div class="container">
      <!-- <GChartView /> -->
      <AnalysisChart 
        :data="data"
        :color="color"
        :legend="legend"
        :backdrop="backdrop"
        :empty="empty"
        :yAxis="yAxis"
      />
      <InputData />
  </div>
</template>

<script>
import InputData from './InputData.vue'
import AnalysisChart from './AnalysisChart.vue'
// import GChartView from '../views/GChartView.vue'

export default {
    components: {
        InputData,
        AnalysisChart,
        // GChartView
    }
}
</script>

<style scoped>
.container {
    margin: 0 auto;
    background-color: white;
    border: 1px solid #D1D1D1;
    width: 70rem;
    height: 110rem;
    padding: 3rem;
}
</style>