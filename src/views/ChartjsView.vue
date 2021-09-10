<script>
import {Bar, mixins} from 'vue-chartjs';
import {locale} from 'moment';

export default {
    name: "vue-chart",
    extends: Bar,
    mixins: [mixins.reactiveProp],              // chartdData 변경시 별도로 건드릴 필요 없이 다시 갱신해주는 코드가 있음
    props: ["chartData", "chartOptions"],       // chartData: 차트에 표현될 데이터 객체, chartdOptions: 차트를 어떻게 보여줄 것인지에 대한 데이터 객체

    mounted() {
        this.renderChart(this.chartData, this.chartOptions);
    },

    created() {
        locale("ko");
    },

    watch: {
        // Chart.js가 chartData는 변경 감시해주지만 chartOptions는 변경감시 지원 안하므로 watcher를 두어야 함
        chartOptions() {
            this.renderChart(this.chartData, this.chartOptions);
        }
    }
}
</script>

<style>

</style>