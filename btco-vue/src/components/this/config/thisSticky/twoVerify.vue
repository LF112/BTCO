<template>
    <div
        class="twoVerify"
        style="opacity: 0; display: none"
        ref="twoVerify"
    >
        <div>
            <div class="head">
                <div>
                    <i class="el-icon-umbrella"></i>
                    <div>此面板上的两步验证配置项</div>
                </div>
            </div>
            <div class="main">
                <div v-if="!IsTwoVerify.status">
                    <div class="logo">
                        <isIcon i="googleTwoVerify"></isIcon>
                        <div>Google 身份验证器</div>
                    </div>
                    <el-divider></el-divider>
                    <div class="PS">
                        <div><i class="el-icon-warning-outline"></i>开启两步验证后首次登陆面板时将要求填写验证码</div>
                        <div><i class="el-icon-help"></i>如果无法验证，命令行输入 'bt 24' 关闭谷歌两步验证</div>
                        <div><i class="el-icon-s-help"></i>帮助文档: </div>
                        <div>https://www.bt.cn/bbs/forum.php?mod=viewthread&tid=37437</div>
                    </div>
                </div>
                <div v-if="IsTwoVerify.status">
                    <div class="logo">
                        <isIcon i="googleTwoVerify"></isIcon>
                        <div>基于 Google Authenticator 进行登录验证</div>
                    </div>
                    <el-divider></el-divider>
                    <div class="auth">
                        <div class="this">
                            <i class="el-icon-user"></i>
                            <p>账号名</p>
                            <div>{{ IsTwoVerify.info.username }}</div>
                            <el-button
                                size="mini"
                                icon="el-icon-copy-document"
                                @click="copyThis(IsTwoVerify.info.username)"
                            ></el-button>
                        </div>
                        <div class="this">
                            <i class="el-icon-paperclip"></i>
                            <p>密钥</p>
                            <div>{{ IsTwoVerify.info.key }}</div>
                            <el-button
                                size="mini"
                                icon="el-icon-copy-document"
                                @click="copyThis(IsTwoVerify.info.key)"
                            ></el-button>
                        </div>
                        <div class="this">
                            <i class="el-icon-menu"></i>
                            <p>类型</p>
                            <div>基于时间</div>
                        </div>
                    </div>
                    <div class="qrcode">
                        <vue-qrcode :value="IsTwoVerify.qrcode" />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="status">
                    <div>{{ IsTwoVerify.status ? '已启用' : '已禁用' }}</div>
                </div>
                <div class="button">
                    <el-button
                        size="mini"
                        :type="(IsTwoVerify.status ? 'warning' : '')"
                        :icon="(IsTwoVerify.status ? 'el-icon-open' : 'el-icon-turn-off')"
                        @click="changeTwoVerifyOpen()"
                    >{{ (IsTwoVerify.status ? '禁用' : '启用') }}</el-button>
                    <el-button
                        size="mini"
                        type="success"
                        v-if="IsTwoVerify.status"
                        @click="loadTwoVerify()"
                    >获取</el-button>
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
            this.$refs.twoVerify.style.opacity = 0
            setTimeout(() => this.$refs.twoVerify.style.display = 'none', 500)
            this.$store.commit('thisConfig/changeShowTwoVerify', false)
        },
        copyThis(v) {
            const that = this
            this.$copyText(v).then(R => {
                that.$copop.success('复制成功~', 2500)
            }, response => that.$copop.warn('复制失败！请重试或手动复制', 2500))
        },
        changeTwoVerifyOpen() {
            if (!this.isDev) {
                const that = this
                this.$copop.load('正在' + (this.IsTwoVerify.status ? '禁用' : '启用' ) + '两步验证···', 2500)
                this.$http.post('/config?action=set_two_step_auth', {
                    act: (this.IsTwoVerify.status ? 0 : 1 )
                }, { emulateJSON: true }).then(R => {

                    that.IsTwoVerify.status = (this.IsTwoVerify.status ? false : true)
                    that.$store.commit('thisConfig/updateIsTwoVerify', that.IsTwoVerify)
                    that.$copop.success('两步验证已' + R.data.msg, 1500)
                    if (that.IsTwoVerify.status) that.loadTwoVerify()

                }, response => this.$copop.warn((this.IsTwoVerify.status ? '禁用' : '启用' ) + '失败，请检查网络或修复面板', 2000))
            } else this.$copop.info('Dev 模式无法操作两步验证', 2000)
        },
        loadTwoVerify() {
            const that = this
            if(!this.isDev) {
                this.$copop.load('正在获取关键信息···', 2000)
                this.$http.post('/config?action=get_key', {}).then(U => {
                    that.$copop.load('正在获取二维码···', 2000)
                    that.$http.post('/config?action=get_qrcode_data', {}).then(A => {

                        that.$copop.success('获取成功', 1500)
                            that.$store.commit('thisConfig/updateIsTwoVerify', {
                            status: true,
                            info: {
                                key: U.data.key,
                                username: U.data.username
                            },
                            qrcode: A.data
                        })
                        that.$store.commit('thisConfig/changeShowTwoVerify', true)

                    }, response => that.$copop.warn('二维码获取失败，请检查网络或修复面板'))
                }, response => that.$copop.warn('关键信息获取失败，请检查网络或修复面板'))
            } else this.$copop.info('Dev 模式无法获取两步验证', 2000)
        }
    },
    watch: {
        showTwoVerify(v) {
            if(v) {
                this.$refs.twoVerify.style.display = 'flex'
                setTimeout(() => this.$refs.twoVerify.style.opacity = 1, 1)
            } else {
                this.$refs.twoVerify.style.opacity = 0
                setTimeout(() => this.$refs.twoVerify.style.display = 'none', 500)
            }
        }
    },
    components: {
        VueQrcode
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisConfig', ['showTwoVerify', 'IsTwoVerify'])
    }
}
</script>

<style lang="less" scoped>
.twoVerify {
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
            > div {
                width: 100%;
                padding: 0 12px;
            }
            .logo {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                > svg {
                    width: 28px;
                    height: 28px;
                }
                > div {
                    color: #fff;
                    font-size: 15px;
                    margin-left: 12px;
                }
            }
            .el-divider {
                width: 65%;
                margin: 10px auto;
                background-color: #fff;
            }
            .auth {
                width: 100%;
                position: relative;
                padding: 0 25px;
                .this {
                    width: 100%;
                    margin: 4px 0;
                    display: flex;
                    align-items: center;
                    > i {
                        color: #fff;
                        font-size: 12px;
                        margin-right: 5px;
                    }
                    > p {
                        color: #fff;
                        font-size: 12px;
                        margin-right: 8px;
                    }
                    > div {
                        min-width: 32%;
                        padding: 4px;
                        background: #515151;
                        border-radius: 4px;
                        font-size: 14px;
                        color: #fff;
                        line-height: 1;
                    }
                    > button {
                        color: #fff;
                        margin-left: 8px;
                    }
                }
            }
            .qrcode {
                width: 100%;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                > img {
                    border-radius: 5px;
                }
            }
            .PS {
                width: 100%;
                padding: 2px 10px 5px;
                text-align: left;
                display: contents;
                > div {
                    color: #fff;
                    font-size: 12px;
                    > i {
                        margin-right: 5px;
                    }
                }
            }
        }
        .bottom {
            width: 100%;
            position: relative;
            margin-top: 8px;
            display: flex;
            .status {
                padding: 2px;
                width: 140px;
                border-radius: 0 2px 0 2px;
                /*background: #303030;*/
                margin-bottom: 8px;
                margin-left: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                > div {
                    color: #fff;
                    font-size: 12px;
                }
            }
            .button {
                position: relative;
                width: 100%;
                padding: 0 8px 8px 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
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