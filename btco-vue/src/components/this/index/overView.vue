<template>
    <div class="overview">
        <div>
            <div class="SYS">
                <isIcon :i="this.isSYS.core"></isIcon>
                <p>{{ isSYS.sys }}</p>
            </div>
            <div class="buttomNav">
                <el-badge
                    is-dot
                    hidden
                    ref="uploadDot"
                ><a @click="clickPanelUpload()">更新</a></el-badge>
                <el-divider direction="vertical"></el-divider>
                <a @click="checkFixPanel()">修复</a>
                <el-divider direction="vertical"></el-divider>
                <a @click="reloadPanel()">重启面板</a>
                <el-divider direction="vertical"></el-divider>
                <a @click="reloadServer()">重启服务器</a>
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
            <uploadView />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uploadView from './uploadView'
export default {
    mounted() {
        if (!this.isDev) this.network()
        this.checkPanelUpload()
        try {
            this.$refs.uploadDot.$el.childNodes[1].style.marginTop = '5px'
            this.$refs.uploadDot.$el.childNodes[1].style.marginRight = '8px'
        } catch (e) {}
    },
    methods: {
        clickPanelUpload() {
            const that = this
            if (!this.isDev) {
                this.$copop.info('正在获取更新···', 3000)
                this.checkPanelUpload(v => {
                    v.show = true
                    that.$store.commit('thisIndex/changeOpenUV', v)
                })
            } else this.$store.commit('thisIndex/changeOpenUV', {   // Dev
                show: true,
                upload: true,
                default: {
                    version: '0.0.0',
                    time: '2020/01/01',
                    UPLOG: 'DEFAULT NONE'
                },
                beta: {
                    version: '0.1.0',
                    time: '2020/01/02',
                    UPLOG: 'BETA NONE'
                }
            })
        },
        checkFixPanel() {
            const that = this
            this.$copop.infoUse('现在尝试校验并修复面板程序？', v => {
                if (v) {
                    that.$copop.load('正在校验····')
                    if (!that.isDev)
                        that.$http.get('/system?action=RepPanel').then(R => {
                            that.$copop.success('成功！请重新启用 BTCO！')
                            //-> 此处可添加 重新启用 BTCO 请求
                            that.$http.get('/system?action=ReWeb').then(R => {
                                that.$copop.success('服务已重启！')
                                that.reloadBTCO()
                            }, response => {
                                that.$copop.warn('服务重启请求失败或出现异常！')
                                setTimeout(() => window.location.reload(), 3000)
                            })
                        }, response => {
                            that.$copop.success('请求失败或出现异常！')
                            setTimeout(() => window.location.reload(), 3000)
                        })
                    else that.$copop.success('成功！请重新启用 BTCO！')
                }
            })
        },
        reloadBTCO() {
            const that = this
            if (!this.isDev) {
                that.$copop.load('正在禁用 BTCO ···')
                this.$http.post('/plugin?action=a&s=BtcoRemove&name=btco', {}).then(R => {
                    if (R.data.status) {
                        that.$copop.load('正在启用 BTCO ···')
                        that.$http.post('/plugin?action=a&s=BtcoInstall&name=btco', {}).then(R => {
                            if (R.data.status) {
                                that.$copop.success('启用 BTCO 成功，正在刷新···')
                                setTimeout(() => window.location.reload(), 2000)
                            } else {
                                that.$copop.warn('启用 BTCO 失败')
                                setTimeout(() => window.location.reload(), 2000)
                            }
                        })
                    } else {
                        that.$copop.warn('禁用 BTCO 失败')
                        setTimeout(() => window.location.reload(), 2000)
                    }
                })
            } else this.$copop.warn('Dev 模式下无需重新启用 BTCO')
        },
        reloadPanel() {
            const that = this
            this.$copop.warnUse('现在重启面板服务？', v => {
                if (v) {
                    that.$copop.load('正在重启面板服务······')
                    if (!that.isDev)
                        that.$http.get('/system?action=ReWeb').then(R => {
                            that.$copop.success('服务已重启！')
                        })
                    else setTimeout(() => that.$copop.success('服务已重启！'),1000)
                    setTimeout(() => window.location.reload(), 3000)
                }
            })
        },
        reloadServer() {    // 重启服务器
            const that = this
            this.$copop.warnUse('现在重启服务器？', v => {
                if (v) {
                    if (!that.isDev) {
                        that.$store.commit('Global/changeReloadServerStatus', true)
                        that.stopWebService(v => {
                            if (!v) console.log('[BTCO] 停止 WEB 服务未成功')
                            that.stopSqlService(v => {
                                if (!v) console.log('[BTCO] 停止 SQL 服务未成功')
                                that.$copop.load('正在重启服务器····', 2000)
                                that.$http.post('/system?action=RestartServer', {}).then(R => {
                                    that.$copop.success('已执行重启，正在等待响应····', 2000)
                                    that.$copop.info('服务器启动完成时将自动刷新页面···')
                                    this.checkReloadServer()
                                })
                            })
                        })
                    } else this.$copop.info('Dev 模式下不支持重启服务器', 1500)
                }
            })
        },
        stopSqlService( callback ) {
            const that = this
            that.$copop.warn('正在关闭 SQL 服务····', 2000)
            if (!this.isDev)
                that.$http.post('/system?action=ServiceAdmin', {
                    name: 'mysqld',
                    type: 'stop'
                }).then(R => {
                    that.$copop.success('已关闭 SQL 服务 √', 2000)
                    callback(true)
                }, response => {
                    that.$copop.warn('[SQL ×] 可能未安装服务')
                    callback(false)
                })
            else this.$copop.info('Dev 模式下不支持停止 SQL 服务', 1500)
        },
        stopWebService( callback ) {
            const that = this
            this.$copop.warn('正在关闭 WEB 服务····', 2000)
            if (!this.isDev)
                that.$http.post('/system?action=ServiceAdmin', {
                    name: that.isWebServer,
                    type: 'stop'
                }).then(R => {
                    that.$copop.success('已关闭 WEB 服务 √', 2000)
                    callback(true)
                }, response => {
                    that.$copop.warn('[WEB ×] 可能未安装服务')
                    callback(false)
                })
            else this.$copop.info('Dev 模式下不支持停止 WEB 服务', 1500)
        },
        checkReloadServer() {   // 检查重启
            const that = this
            if(!this.isDev)
                this.$http.get('/system?action=GetSystemTotal').then(R => {
                    clearInterval(that.reloadServerHeartbeat)
                    that.reloadServerHeartbeat = null
                    that.$copop.success('重启成功！', 2000)
                    setTimeout(() => window.location.reload(), 1500)
                }, response => {
                    that.$copop.info('尚未启动，正在等待···', 1500)
                    that.checkReloadServer()
                    console.log('[BTCO] 服务器尚未启动...')
                })
            else this.$copop.info('Dev 模式下不支持轮询重启检查', 1500)
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
                    that.$store.commit('thisIndex/changeIsWebServer', R.data.webserver)

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
        },
        checkPanelUpload( callback ) {    // 检查面板更新并更新相关元素状态
            const that = this
            if(!this.isDev)
                this.$http.get('/ajax?action=UpdatePanel').then(R => {

                    that.$store.commit('thisIndex/changeVersion', (R.data.msg.is_beta == 1 ? 'T' : 'V') + R.data.msg.version)
                    that.$store.commit('thisIndex/changeIsTEST', (R.data.msg.is_beta == 1 ? true : false))
                    if (!R.data.status) {
                        if (callback !== undefined)
                            callback({
                                upload: false,
                                default: {
                                    version: R.data.msg.version,
                                    time: R.data.msg.uptime,
                                    UPLOG: R.data.msg.updateMsg,
                                },
                                beta: {
                                    version: R.data.msg.beta.version,
                                    time: R.data.msg.beta.uptime,
                                    UPLOG: R.data.msg.beta.updateMsg
                                }
                            })
                    } else {
                        // 有更新
                        that.$refs.uploadDot.$el.childNodes[1].style.display = ''
                        if (callback !== undefined)
                            callback({
                                upload: true,
                                default: {
                                    version: R.data.msg.version,
                                    time: R.data.msg.uptime,
                                    UPLOG: R.data.msg.updateMsg,
                                },
                                beta: {
                                    version: R.data.msg.beta.version,
                                    time: R.data.msg.beta.uptime,
                                    UPLOG: R.data.msg.beta.updateMsg
                                }
                            })
                    }

                },  response => {
                    that.$copop.warn('检查更新失败···', 1500)
                })
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisIndex', [
            'thatWEB', 'thatFTP', 'thatDATABASE',
            'isIP', 'isSYS', 'isWebServer', 'version'
        ])
    },
    components: {
        uploadView
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
            a {
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