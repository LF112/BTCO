<template>
    <div class="overview">
        <div>
            <div class="SYS">
                <isIcon :i="this.isSYS.core"></isIcon>
                <p>{{ isSYS.sys }}</p>
            </div>
            <div class="buttomNav">
                <a>更新</a>
                <el-divider direction="vertical"></el-divider>
                <a>修复</a>
                <el-divider direction="vertical"></el-divider>
                <a @click="reloadPanel()">重启面板</a>
                <el-divider direction="vertical"></el-divider>
                <a>重启服务器</a>
            </div>
            <div class="INFO">
                <div>
                    <div class="IP">
                        <p>{{ isIP }}</p>
                    </div>
                    <div class="this">
                        <div class="item">
                            <div>{{ thatWEB }}</div>
                            <div class="i">网站</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="item">
                            <div>{{ thatFTP }}</div>
                            <div class="i">FTP</div>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="item">
                            <div>{{ thatDATABASE }}</div>
                            <div class="i">数据库</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    mounted() {
        if (!this.isDev) this.network()
    },
    methods: {
        reloadPanel() {
            const that = this
            this.$copop.warnUse('现在重启面板服务？', v => {
                if (v) {
                    that.$copop.info('正在重启面板服务······')
                    if (!that.isDev)
                        that.$http.get('/system?action=ReWeb').then(R => {
                            that.$copop.success('服务已重启！')
                        })
                    else setTimeout(() => that.$copop.success('服务已重启！'),1000)
                    setTimeout(() => window.location.reload(), 3000)
                }
            })
        },
        network() {
            const that = this
            if (!this.isDev)
                this.$http.get('/plugin?action=a&name=btco&s=BT_index').then(R => {
                    if (R.data.check.code == -2 || R.data.check.code == -1)
                        that.$store.commit('thisIndex/changeIsPro', false)
                    else that.$store.commit('thisIndex/changeIsPro', true)

                    that.$store.commit('thisIndex/updateNetwork',
                        R.data.siteCount,
                        R.data.ftpCount,
                        R.data.databaseCount
                    )
                    that.$store.commit('thisIndex/changeIsIP', R.data.ip)
                    that.$store.commit('thisIndex/changeRunTime', R.data.time)
                    that.$store.commit('thisIndex/changeIsPY', R.data.py)

                    document.title = R.data.BTTitle + ' | BTCO'

                    let thatSysCore = 'unknown'
                    if (/Centos/i.test(R.data.system))
                        thatSysCore = 'centos'
                    else if (/Deepin/i.test(R.data.system))
                        thatSysCore = 'deepin'
                    else if (/Ubuntu/i.test(R.data.system))
                        thatSysCore = 'ubuntu'
                    else if (/Fedora/i.test(R.data.system))
                        thatSysCore = 'fedora'
                    else if (this.isDev)
                        thatSysCore = 'btco'    // Dev | 皮一下owo

                    that.$store.commit('thisIndex/changeIsSYS', {
                        sys: R.data.system,
                        core: thatSysCore
                    })
                })
            else {
                // Dev
            }
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisIndex', [
            'thatWEB', 'thatFTP', 'thatDATABASE',
            'isIP', 'isSYS'
        ])
    }
}
</script>

<style lang="less" scoped>
.overview {
    position: relative;
    margin-top: 10px;
    max-width: 100%;
    min-width: 60%;
    > div {
        width: 100%;
        height: auto;
        border-radius: 2px;
        background-color: rgba(81, 81, 81, 0.48);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
        .SYS {
            width: auto;
            position: relative;
            display: inline-block;
            border-radius: 0 0 6px 0;
            background-color: rgba(51, 51, 51, 0.82) !important;
            > svg {
                float: left;
                padding: 2px 6px;
                width: 28px;
                height: 28px;
                min-width: 16px;
                min-height: 23px;
            }
            > p {
                color: #fff;
                display: inline-block;
                padding: 3px 6px 3px 0;
                font-size: 13px;
            }
        }
        .buttomNav {
            position: relative;
            margin: 15px 0;
            padding: 0 10px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            > a {
                margin: 0 5px;
                padding: 3px 8px;
                border: 0;
                border-radius: 2px;
                background: #393939;
                color: #fff;
                text-decoration: none;
                font-size: 12px;
            }
            .el-divider {
                background: #dcdcdc;
            }
        }
        .INFO {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            > div {
                width: 100%;
                text-align: center;
                .IP {
                    display: inline-block;
                    padding: 2px 10px;
                    border-radius: 3px 3px 0 0;
                    background: rgba(85, 85, 85, 0.82) !important;
                    > p {
                        font-size: 14px;
                        color: #fff;
                    }
                }
                .this {
                    width: 100%;
                    padding: 5px 0;
                    border-top: 2px solid #525252;
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
                        > div {
                            color: #fff;
                            font-size: 16px;
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
    }
}
</style>