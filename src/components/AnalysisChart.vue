<template>
  <div class="analysis-chart">
      <ChartjsView 
        class="analysis-chart_content"
        :chartData="chartData"
        :chartOptions="chartOptions"
        :width="null"
        :height="null"
      />
      <div class="analysis-chart_backdrop" v-if="backdrop"></div>
      <div class="analysis-chart_empty-layer" v-if="empty">
          <p>
              데이터가 없어요
          </p>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import ChartjsView from '../views/ChartjsView.vue'
export default {
    components: {
        ChartjsView
    },
    props: [
        "data",             // (배열) x축과 y축에 표시될 데이터.
        "color",            // (스트링) 차트의 메인 컬러를 HEX값으로 표시
        "legend",           // (스트링) 차트 범례. 이 값이 바뀔 때마다 chartOptions를 변경하여 차트 업데이트 유도
        "backdrop",         // (boolean) true일 때 차트 비활성화 표시 (반투명 회색 레이어 등)
        "empty",            // (boolean) true일 때 측정된 데이터 없음을 표시
        "yAxis",            // (스트링) y축 단위. y축 단위가 횟수 또는 시간(분)일 수 있기 때문.
    ],

    computed: {
        bars() {
            return this.data.map((item) => {
                return {
                    x: item.timestamp,      // x축은 시계열 데이터
                    y: item.data ?? 0       // y축은 실제 데이터
                }
            })
        },

        chartData() {
            return {
                datasets: [
                    {
                        data: this.bars,            // 위에서 정의한 (x,y) 배열
                        barThickness: "flex",       // 하나의 x축 영역의 너비
                        barPercentage: 0.5,         // 하나의 x축 영역 안에서 막대 그래프가 몇 퍼센트의 너비를 가지는지
                        backgroundColor: this.color // 백그라운드 컬러
                    }
                ]
            }
        },
        
        chartOptions() {
            return {
                responsive: true,               // 반응형
                aspectRatio: 1.19,              // 반응형 유지하면서 가로-세로 비율 고정
                legend: {
                    display: false,             // 차트 내 범례 디스플레이 비활성화
                },
                scales: {                       // x,y축 설정. 별도의 getters로 분리
                    xAxes: this.xAxes,          
                    yAxes: this.yAxes,
                },
                animation: {
                    duration: 0,                // 트랜지션 효과 비활성화
                }
            }
        },

        xAxes() {
            return [
                {
                    type: "time",                   // x축 타입을 시간으로 설정
                    time: this.currentLegend,       // 시계열 관련 데이터, 별도의 getters로 분리
                    gridLines: {
                        borderDash: [4,6]           // 그리드 관련 점선 스타일링
                    },
                    ticks: this.ticks               // 그리드로 나뉘어서 그려지는 하나의 주기 관련 설정
                }
            ]
        },

        currentLegend() {
            switch (this.legend) {
                case "d":                           // 일간
                    return {
                        unit: "hour",               // x축의 시계열 데이터를 나누는 단위
                        round: "minute",            // 시계열 데이터를 반올림할 단위
                        unitStepSize: 4,            // 몇개의 unit을 하나의 tick으로 계산할 것인지
                        displayFormats: {           // 날짜 포맷
                            hour: "H"
                        }
                    };
                case "w":                           // 주간
                    return {
                        unit: "day",               
                        round: "hour",            
                        unitStepSize: 1,           
                        displayFormats: {           
                            day: "dd"
                        }
                    };
                case "m":                           // 월간
                    return {
                        unit: "day",               
                        round: "hour",            
                        unitStepSize: 7,           
                        displayFormats: {           
                            day: "D"
                        }
                    };
                default:
                    return {};    
            }
        },

        ticks() {
            switch(this.legend) {
                case "d":               // 일간
                    return {
                        /*
                            다음날 0시를 x축에 나타내기 위함.
                            index가 6인 이유는 currentLegend의 unitsize가 4일 때 6번째의 index는 항상 다음날 0시를 나타내기 때문
                        */
                        callback: (tick, index, _array) => {
                            if(index == 6){
                                return 24;
                            }
                            return tick;
                        }
                    };
                case "m":               // 월간
                    return {
                        /*
                            매달 1일은 틱으로 나타내지 않음
                        */
                        callback: (tick, index, _array) => {
                            if(index == 0){
                                return "";
                            }
                            return `${tick}일`;
                        }
                    };
                case "w":
                    return {};
                default:
                    return {};
            }
        },

        yAxes() {
            return [
                {
                    gridLines: {
                        display: false,                     // y축은 그리드를 선으로 표시하지 않음
                    },
                    position: "right",                      // y축 라벨 위치
                    ticks: {
                        // y축 그리드를 항상 3등분
                        stepSize: Math.ceil(
                            Math.max(
                                this.bars.reduce((acc, cur) => {
                                    return Math.max(acc, Number(cur.y));
                                }, 0) / 3,
                                1
                            )
                        ),
                        suggestedMax: 3,                    // y축 디폴트 최대값
                        beginAtZero: true,                  // y축 시작을 항상 0으로
                        callback: (value, _index, _values) => {
                            return `${value}${this.yAxis}`;
                        } 
                    }                       
                }
            ]
        }
    }
}
</script>

<style>

</style>