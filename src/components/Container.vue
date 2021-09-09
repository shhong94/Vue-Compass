<template>
  <div class="container">
      <!-- <GChartView /> -->
      <InputData />
  </div>
</template>

<script>
import InputData from './InputData.vue'
// import GChartView from '../views/GChartView.vue'

export default {
    components: {
        InputData,
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