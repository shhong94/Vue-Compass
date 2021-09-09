<template>
  <div>
    <label for="initial">Inital </label>
    <input id="inital" type="text" v-model="initial" />
    <br/>
    <label for="netSalary">Net Salary </label>
    <input id="netSalary" type="text" v-model="netSalary" />
    <br/>
    <label for="expenditure">Expenditure </label>
    <input id="expenditure" type="text" v-model="expenditure" />
    <br/>
    <label for="saving">Saving </label>
    <input id="saving" type="text" v-model="saving" />
    <br/>
    <label for="earning">Earning </label>
    <input id="earning" type="text" v-model="earning" />
    <br/>
    <button type="button" @click="drawChart">draw</button>
  </div>
</template>

<script>  
export default {
  data() {
    return {
      initial: '',
      netSalary: '',
      expenditure: '',
      saving: '',
      earning: '',
    }
  },

  methods: {
    drawChart() {
      const chartData = {
        initial: this.initial,
        netSalary: this.netSalary,
        expenditure: this.expenditure,
        saving: this.saving,
        earning: this.earning,
      }
      console.log(chartData);
      this.$store.commit('setChartData', chartData);
    }
  },
  
}
</script>

<style>

</style>