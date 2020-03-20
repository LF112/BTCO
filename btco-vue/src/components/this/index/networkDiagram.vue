<template>
    <div class="networkDiagram">
        <div>
            <div class="network">
                <div class="item">
                    <div>{{ networkUP + ' KB' }}</div>
                    <div class="i">上行</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="item">
                    <div>{{ networkDown + ' KB' }}</div>
                    <div class="i">下行</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="item">
                    <div>{{ downTotal }}</div>
                    <div class="i">总发送</div>
                </div>
                <el-divider direction="vertical"></el-divider>
                <div class="item">
                    <div>{{ upTotal }}</div>
                    <div class="i">总接收</div>
                </div>
            </div>
        </div>
        <highcharts
            :options="chart"
            class="highcharts"
            ref="isChart"
        ></highcharts>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
export default {
    mounted() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        })
        const that = this
        if (this.isDev) // Dev | 随机数据
            this.DevHeartbeat = setInterval(() => {
                let chart = that.$refs.isChart.chart,
                series0 = chart.series[0],
                series1 = chart.series[1]
                chart.series[0].addPoint([(new Date()).valueOf(), Math.random()], true, series0.data.length > 5)
                chart.series[1].addPoint([(new Date()).valueOf(), Math.random()], true, series1.data.length > 5)
            }, 2000)
    },
    watch: {
        networkUP(v){
            let chart = this.$refs.isChart.chart,
                series = chart.series[0]
            chart.series[0].addPoint([(new Date()).valueOf(), v], true, series.data.length > 5)
        },
        networkDown(v) {
            let chart = this.$refs.isChart.chart,
                series = chart.series[1]
            chart.series[1].addPoint([(new Date()).valueOf(), v], true, series.data.length > 5)
        }
    },
    data() {
        return {
            chart: {
                chart: {
                    type: 'spline',
                    marginRight: 10,
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgba(255, 255, 255,0)'],
                            [1, 'rgba(240, 240, 255,0)']
                        ]
                    }
                },
                credits: {
                    text: '由 BTCO 强力驱动',
                    href: 'https://btco.lf.tn'
                },
                title: {
                    text: null,
                    style: {
                        color: "#ffffff",
                        font_weight: "lighter!important",
                    }
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: [{
                    title: {
                        text: null
                    }
                }, {
                    title: {
                        text: null
                    }
                }],
                tooltip: {
                    backgroundColor: 'rgba(115, 115, 115, 0.54)',
                    shadow: false,
                    borderColor: 'rgba(240, 240, 255,0)',
                    borderRadius: 10,
                    crosshairs: true,
                    style: {
                        color: "#ffffff",
                    },
                    formatter() {
                        return Highcharts.dateFormat('%H:%M:%S', this.x) + 
                        '<br/>' + Highcharts.numberFormat(this.y, 2) + 'KB'
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: '',
                    data: [],
                    color: '#fff'
                }, {
                    name: '',
                    data: [],
                    color: 'rgba(0, 145, 228, 0.69)'
                }]
            }
        }
    },
    components: {
        highcharts: Chart,
        DevHeartbeat: null
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisIndex', ['networkUP', 'networkDown', 'downTotal', 'upTotal'])
    }
}
</script>

<style lang="less" scoped>
.networkDiagram {
    width: 100%;
    height: 255px;
    position: relative;
    margin-top: 10px;
    border-radius: 2px;
    background-color: rgba(81, 81, 81, 0.48);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    .highcharts {
        width: 100%;
        height: calc(100% - 60px);
    }
    > div {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        .network {
            width: 100%;
            padding: 5px 0;
            margin: 5px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-divider {
                background: #c5c5c5;
                height: 1.5em;
            }
            .item {
                display: inline-block;
                padding: 0 8px;
                text-align: center;
                > div {
                    color: #fff;
                    font-size: 12px;
                    line-height: 1;
                }
                .i {
                    color: #e6e6e6;
                    font-size: 12px;
                    line-height: 1.3;
                }
            }
        }
    }
}
</style>