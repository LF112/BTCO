<template>
    <div>
        <ul class="magnetInfo">
            <li
                v-for="(is, index) in magnetArr"
                :key="index"
                @click="click(is.name)"
            >
                <div class="head">
                    <div
                        class="status"
                        :style="statusColor(is.color)"
                    ></div>
                    <div class="statusInfo">
                        <p>{{ is.context }}</p>
                        <div>{{ is.name }}</div>
                    </div>
                    <div class="statusDigital">
                        <p>{{ is.percentage }}</p>
                    </div>
                </div>
                <div class="bottom">
                    <div>
                        <div :style="percentageWidth(is.percentage)"></div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    mounted() {

        if (!this.isDev) this.$nextTick(() => 
            this.Heartbeat = setInterval(() => this.netWork() , 2000)
        )
        this.netWork()
        this.diskGet()

    },
    methods: {
        click( is ) {
            const that = this
            if (is == '内存使用率') this.$copop.infoUse('真的要释放内存吗？', v => {
                if (v) {
                    that.$copop.info('请稍等，正在释放...', 3000)
                    if (!this.isDev)
                        that.$http.post('/system?action=ReMemory', { toUpdate: 'yes' }).then(R => {
                            that.$copop.success('释放成功！', 2000)
                        })
                    else setTimeout(()=> that.$copop.success('释放成功！', 2000), 2000)
                }
            })
        },
        diskGet() {
            const that = this
            if (!this.isDev)
                this.$http.get('/system?action=GetDiskInfo').then(R => {
                    R.data.forEach(v => {
                        that.magnetArr.push({
                            name: v.path,
                            context: v.size[1] + ' / ' + v.size[0],
                            percentage: v.size[3]
                        })
                    })
                })
            else {
                //this.$copop.info('Dev 模式', 1500)
                that.magnetArr.push({
                    name: '/',
                    context: '20G / 1TB',
                    percentage: '20%'
                })
            }
        },
        netWork() {
            const that = this
            if (!this.isDev)
                this.$http.get('/system?action=GetNetWork').then(R => {
                    if (!that.init) {
                        that.$store.commit('thisIndex/changeVersion', R.data.version)
                        that.init = true
                    }

                    // NETWORK
                    that.$store.commit('thisIndex/updateNetwork', 
                        R.up,
                        R.down,
                        that._.Tool.Tosize(R.downTotal),
                        that._.Tool.Tosize(R.upTotal)
                    )

                    // 状态模块
                    let arr = {}

                    // CPU
                    arr.cpu = {}
                    arr.cpu.count = R.data.cpu[1]
                    arr.cpu.is = R.data.cpu[0]

                    // 负载状态
                    arr.load = {}
                    arr.load.index = Math.round((R.data.load.one / R.data.load.max) * 100)

                    // 内存使用率
                    arr.ram = {}
                    arr.ram.used = R.data.mem.memRealUsed
                    arr.ram.total = R.data.mem.memTotal
                    arr.ram.is = (R.data.mem.memRealUsed * 100 / R.data.mem.memTotal).toFixed(1)

                    that.upload(arr)
                }, response => {
                    if (!this.failHB) {
                        clearInterval(this.Heartbeat)
                        this.Heartbeat = null
                        this.failHB = true
                        this.$copop.warnUse('BT_INDEX 获取失败！重试?', v => {
                            if (v) {
                                that.$copop.info('正在等待重新连接···', 2000)
                                this.failHB = false
                                that.Heartbeat = setInterval(() => that.netWork() , 2000)
                            }
                            else that.$copop.warn('将不会更新状态面板 ×')
                        })
                    }
                })
            else {
                this.$copop.info('Dev 模式', 1500)
                this.upload({
                    cpu: { count: 32, is: 58 },
                    load: { index: 2 },
                    ram: { is: 43, used: 233, total: 1024 }
                })
            }
        },
        upload( arr ) {
            
            // 负载状态
            if (arr.load !== undefined) {
                const loadArr = [
                    { title: '运行堵塞', val: 100, color: '#dd2f00' },
                    { title: '运行缓慢', val: 90, color: '#ff9900' },
                    { title: '运行正常', val: 70, color: '#20a53a' },
                    { title: '运行流畅', val: 30, color: '#20a53a' }
                ]
                let thisLoadArr = {}
                for (var i = 0; i < loadArr.length; i++) {
                    if (arr.load.index <= loadArr[i].val) {
                        thisLoadArr = loadArr[i]
                        continue
                    }
                    break
                }
                this.magnetArr[0].context =  thisLoadArr.title
                this.magnetArr[0].color =  thisLoadArr.color
                this.magnetArr[0].percentage = arr.load.index + '%'
            }
            // CPU
            if (arr.cpu !== undefined) {
                this.magnetArr[1].context = arr.cpu.count + ' 核心'
                this.magnetArr[1].percentage = arr.cpu.is + '%'
            }
            // 内存使用率
            if (arr.ram !== undefined) {
                this.magnetArr[2].context = arr.ram.used + '/' + arr.ram.total + '(MB)'
                this.magnetArr[2].percentage = arr.ram.is + '%'
            }

        },
        percentageWidth( i ) {
            return 'width: ' + i
        },
        statusColor( i ) {
            if (i === undefined) return ''
            else return 'background: ' + i
        }
    },
    beforeDestroy() {
        clearInterval(this.Heartbeat)
        this.Heartbeat = null
    },
    data () {
        return {
            magnetArr: [
                {
                    name: '负载状态',
                    context: '正在加载',
                    percentage: '0%'
                },
                {
                    name: 'CPU使用率',
                    context: '正在加载',
                    percentage: '0%'
                },
                {
                    name: '内存使用率',
                    context: '正在加载',
                    percentage: '0%'
                }
            ],
            Heartbeat: '',
            init: false,
            failHB: false
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev'])
    }
}
</script>

<style lang="less" scoped>
.magnetInfo {
    text-align: center;
    list-style: none;
    > li {
        margin: 0 5px;
        width: 145px;
        height: 50px;
        display: inline-block;
        border-radius: 0 2px 2px 0;
        background-color: rgba(81, 81, 81, 0.48);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
        .head {
            position: relative;
            width: 100%;
            height: calc(100% - 5px);
            display: flex;
            align-items: center;
            justify-content: center;
            .status {
                position: absolute;
                left: 0;
                width: 10px;
                height: 45px;
                background: rgb(85, 85, 85);
                box-shadow: 0 0 8px rgba(0, 0, 0, 0.22);
            }
            .statusInfo {
                height: 100%;
                padding: 5px;
                text-align: center;
                > p {
                    font-size: 15px;
                    line-height: 1.5;
                    color: #fff;
                }
                > div {
                    font-size: 12px;
                    line-height: 0.8;
                    color: #fff;
                }
            }
            .statusDigital {
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 2px 5px;
                border-radius: 5px 0 0 0;
                background-color: rgba(51, 51, 51, 0.82) !important;
                > p {
                    letter-spacing: 0.05em;
                    font-size: 13px;
                    line-height: 1;
                    color: #fff;
                }
            }
        }
        .bottom {
            position: relative;
            height: 5px;
            width: 100%;
            > div {
                position: relative;
                overflow: hidden;
                height: 5px !important;
                background-color: rgba(100, 100, 100, 1);
                vertical-align: middle;
                > div {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    background-color: rgba(0, 145, 228, 0.69);
                    text-align: right;
                    line-height: 1;
                    transition: width 2s ease;
                }
            }
        }
    }
}
</style>