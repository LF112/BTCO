<template>
    <div
        class="wechatApp"
        style="opacity: 0; display: none"
        ref="wechatApp"
    >
        <div>
            <div class="head">
                <div>
                    <i class="el-icon-connection"></i>
                    <div>{{(showWCA ? '使用微信扫码二维码' : '绑定微信')}}</div>
                </div>
            </div>
            <div class="main">
                <div v-if="!showWCA && !showBindList">
                    <div class="qrcode">
                        <div>
                            <vue-qrcode :value="qrcode" />
                        </div>
                        <div class="status">
                            <i
                                :class="(success ? 'el-icon-circle-check' : 'el-icon-loading')"
                                :style="(success ? 'color: #67c23a' : '')"
                            ></i>
                            <div>{{ (success ? '绑定成功!' : (qrcode !== 'unknown' ? '正在等待扫描绑定' : '载入中···')) }}</div>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="PS">
                        <div><i class="el-icon-warning-outline"></i>打开宝塔面板小程序</div>
                        <div><i class="el-icon-help"></i>使用宝塔小程序扫描当前二维码，绑定该面板</div>
                    </div>
                </div>
                <div v-show="showWCA && !showBindList">
                    <div class="pic">
                        <img src="https://app.bt.cn/static/app.png" />
                    </div>
                </div>
                <div
                    v-if="showBindList"
                    class="BindList"
                >
                    <div v-if="bindArr.length == 0">
                        <h2>暂无绑定</h2>
                    </div>
                    <div
                        v-for="(v, index) in bindArr"
                        :key="index"
                    >
                        <div class="pic">
                            <img :src="v.pic" />
                        </div>
                        <div class="nickname">
                            <h2>{{ v.name }}</h2>
                            <nav></nav>
                            <el-button
                                size="mini"
                                @click="unbind(v.id, v.name)"
                            >取消绑定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="button">
                    <el-button
                        size="mini"
                        @click="bindList()"
                    >{{ showBindList ? '继续绑定' : '绑定列表' }}</el-button>
                    <el-button
                        size="mini"
                        type="info"
                        @click="showWCAcode()"
                    >{{ showWCA ? '返回绑定微信' : '小程序二维码' }}</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="close()"
                    >取消</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueQrcode from 'vue-qrcode'
export default {
    methods: {
        close() {
            this.$refs.wechatApp.style.opacity = 0
            setTimeout(() => this.$refs.wechatApp.style.display = 'none', 500)
            this.$store.commit('thisConfig/changeShowWechatApp', false)
            clearInterval(this.Heartbeat)
            this.Heartbeat = null
            this.init = false
        },
        showWCAcode() {
            this.showBindList = false
            this.showWCA = (this.showWCA ? false : true)
        },
        bindList() {
            const that = this
            this.showBindList = (this.showBindList ? false : true)
            this.showWCA = false
            this.bindArr = []
            if (this.init) {
                clearInterval(this.Heartbeat)
                this.Heartbeat = null
            }
            console.log(this.init)
            if (!this.isDev && this.showBindList)
                this.$http.get('/wxapp?action=get_user_info').then(R => {

                    that.$copop.success('获取成功', 1500)
                    for (let v in R.data.msg)
                        that.bindArr.push({
                            name: R.data.msg[v].nickName,
                            pic: R.data.msg[v].avatarUrl,
                            id: v
                        })
                    if (that.bindArr.length == 0 && that.init) {
                        that.showBindList = false
                        that.init = false
                    } else that.init = false

                }, response => that.$copop.warn('列表获取失败，请检查网络或修复面板', 2500))
        },
        unbind(v, name) {
            const that = this
            this.close()
            this.$copop.infoUse('取消 ' + name + ' 的面板小程序绑定？', r => {
                if (r) {
                    that.$copop.load('正在取消 ' + name + ' 的绑定···', 2500)
                    that.$http.get('/wxapp?action=blind_del&uid=' + v).then(R => {
                        
                        that.$copop.success('已取消 ' + name + ' 的绑定！', 1500)
                        that.bindList()
                        that.Call.$emit('reloadGetConfig')

                    }, response => that.$copop.warn('取消绑定失败，请检查网络或修复面板', 2500))
                }
            })
        },
        netCheck() {
            const that = this
            this.$http.get('/wxapp?action=blind_result').then(R => {
                if(R.data) {
                    clearInterval(this.Heartbeat)
                    this.Heartbeat = null
                    that.success = true
                    that.$copop.success('绑定成功！', 1500)
                    that.Call.$emit('reloadGetConfig')
                }
            }, response => {
                clearInterval(this.Heartbeat)
                this.Heartbeat = null
                this.$copop.warnUse('绑定状态获取失败！重试?', v => {
                    if (v) {
                        that.$copop.load('正在等待重新连接···', 2000)
                        that.Heartbeat = setInterval(() => that.netCheck() , 2000)
                    } else that.$copop.warn('将不会获取二维码状态 ×', 2500)
                })
            })
        }
    },
    data() {
        return {
            init: false,
            showWCA: false,
            showBindList: false,
            qrcode: 'unknown',
            success: false,
            Heartbeat: '',
            bindArr: []
        }
    },
    watch: {
        showWechatApp(v) {
            if(v) {
                const that = this
                this.$refs.wechatApp.style.display = 'flex'
                setTimeout(() => this.$refs.wechatApp.style.opacity = 1, 1)
                setTimeout(() => {
                    if (!that.isDev) {
                        that.init = true
                        that.bindList()
                        that.$http.get('/wxapp?action=blind_qrcode').then(R => {

                            that.qrcode = R.data.msg
                            that.success = false
                            that.Heartbeat = setInterval(() => that.netCheck() , 2000)

                        }, response => that.$copop.warn('二维码获取失败，请检查网络或修复面板', 2500))
                    }
                }, 500)
            } else {
                this.$refs.wechatApp.style.opacity = 0
                setTimeout(() => this.$refs.wechatApp.style.display = 'none', 500)
            }
        }
    },
    components: {
        VueQrcode
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisConfig', ['showWechatApp'])
    }
}
</script>

<style lang="less" scoped>
.wechatApp {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: hsla(0, 0%, 0%, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    > div {
        min-width: 300px;
        margin: 0 12px;
        background: #404040;
        border-radius: 2px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);

        .head {
            position: relative;
            width: 100%;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            > div {
                padding: 8px 12px;
                width: 100%;
                display: flex;
                align-items: center;
                background: #303030;
                border-radius: 2px 2px 0 0;
                > i {
                    color: #fff;
                }
                > svg {
                    width: 16px;
                    height: 16px;
                }
                > div {
                    color: #fff;
                    margin-left: 7px;
                    font-size: 14px;
                    font-weight: lighter;
                }
            }
        }
        .main {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .BindList {
                width: 100%;
                padding: 0 12px;
                > div {
                    background: #333;
                    border-radius: 5px;
                    margin: 10px 0;
                    padding: 5px 10px;
                    display: flex;
                    align-items: center;
                    > h2 {
                        color: #fff;
                        font-size: 18px;
                        width: 100%;
                        text-align: center;
                        font-weight: lighter;
                    }
                    .pic {
                        border: 2px solid hsla(0, 0%, 53%, 0.4);
                        width: 45px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        > img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }
                    .nickname {
                        width: 100%;
                        padding-left: 10px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        > h2 {
                            color: #fff;
                            font-size: 18px;
                        }
                        > nav {
                            flex-grow: 1;
                            flex-shrink: 0;
                        }
                    }
                }
            }
            > div:not(.BindList) {
                width: 100%;
                padding: 0 12px;
                .pic {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    > img {
                        width: 185px;
                        height: 185px;
                        padding: 2px;
                        border-radius: 10px;
                    }
                }
                .qrcode {
                    width: 100%;
                    padding: 4px;
                    > div:not(.status) {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        > img {
                            border-radius: 5px;
                        }
                    }
                    .status {
                        width: 100%;
                        text-align: center;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 10px;
                        > i {
                            color: #fff;
                            font-size: 12px;
                            margin-right: 8px;
                        }
                        > div {
                            color: #fff;
                            font-size: 12px;
                        }
                    }
                }
                .el-divider {
                    margin: 4px auto;
                    width: 92%;
                    background-color: #c5c5c5;
                }
                .PS {
                    width: 100%;
                    padding: 2px 10px 5px;
                    text-align: left;
                    > div {
                        color: #fff;
                        font-size: 12px;
                        > i {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .bottom {
            width: 100%;
            position: relative;
            margin-top: 8px;
            display: flex;
            .button {
                position: relative;
                width: 100%;
                padding: 0 8px 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                .el-button + .el-button {
                    margin-left: 8px;
                }
                > button {
                    color: #fff;
                }
            }
        }
    }
}
</style>