<template>
    <div class="stickySettings">
        <div>
            <div
                class="item"
                v-for="(isItem, index) in sticky"
                :key="index"
            >
                <div>
                    <div
                        :class="'switch' + (isItem.open ? ' switch-click' : '')"
                        @click="isSwitch($event, isItem.fun, isItem.tip)"
                    ></div>
                    <el-divider></el-divider>
                    <div class="title">{{ isItem.name }}</div>
                </div>
            </div>
        </div>
        <panelSsl />
        <panelApi />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import panelSsl from './panelSsl'
import panelApi from './panelApi'
export default {
    mounted() {
        if(window.location.protocol.indexOf('https') !== -1) {
            this.sticky[2].open = true
            this.$store.commit('thisConfig/changeIsHTTPS', true)
        }

        // DEBUG
        if(this.isDev) this.$store.commit('thisConfig/changeShowAPI', true)
    },
    data() {
        return {
            sticky: [
                { name: '关闭面板', fun: 'closePanel', tip: '关闭面板会导致您无法访问面板', open: false },
                { name: '监听IPv6', fun: 'listenIPv6', open: false },
                { name: '面板SSL', fun: 'panelSSL', tip: '危险！此功能不了解请勿操作!', open: false },
                { name: 'API', fun: 'panelAPI', open: false }
            ]
        }
    },
    methods: {
        isSwitch(v, fun, tip) {
            const that = this, 
                clickState = v.target.classList.contains('switch-click'),
                thisTitle = v.currentTarget.parentElement.querySelector('.title').innerText
            if(tip !== undefined) this.$copop.warn(tip, 2500)
            this.$copop.infoUse((clickState ? '禁用' : '启用') + thisTitle + '吗?', is => {
                if (is) {
                    if (!clickState) {
                        v.target.classList.add('switch-click')
                        if(!that.isDev)
                            that[fun](true)
                        else that.$copop.info('Dev 模式无法' + (clickState ? '禁用' : '启用') + thisTitle, 1500)
                    } else {
                        v.target.classList.remove('switch-click')
                        if(!that.isDev)
                            that[fun](false)
                        else that.$copop.info('Dev 模式无法' + (clickState ? '禁用' : '启用') + thisTitle, 1500)
                    }
                }
            })
        },
        closePanel(v) {
            // 无需判断，触发直接关闭刷新
            this.$copop.load('正在关闭面板···')
            this.$http.post('/config?action=ClosePanel', {}).then(R => {
                this.$copop.success('面板已关闭，请在终端开启。')
                setTimeout(() => window.location.reload(), 2000)
            },  response => {
                this.$copop.warn('关闭失败了！')
                setTimeout(() => window.location.reload(), 2000)
            })
        },
        listenIPv6(v) {
            const that = this
            this.$copop.load('正在配置IPv6中···', 2000)
            this.$http.post('/config?action=set_ipv6_status', {}).then(R => {
                that.$copop.success(R.data.msg, 2000)
            }, response => that.$copop.warn('请求失败，请检查网络或修复面板', 2000))
        },
        panelSSL(v) {
            if (!this.isDev) {
                this.$copop.load('正在检查···', 2000)
                const that = this
                let ssl = {}
                this.$http.post('/config?action=get_cert_source', {}).then(R => {

                    ssl.cert_type = R.data.cert_type
                    ssl.email = R.data.email
                    ssl.domain = R.data.domain
                    that.$copop.load('正在获取证书······', 2000)
                    that.$http.post('/config?action=GetPanelSSL', {}).then(R => {
                        
                        that.$copop.success('已载入~', 1500)
                        ssl.ssl = {
                            privateKey: R.data.privateKey,
                            certPem: R.data.certPem
                        }
                        that.$store.commit('thisConfig/updateIsSSL', ssl)
                        that.$store.commit('thisConfig/changeShowSslChange', true)

                    }, response => this.$copop.warn('获取失败，请检查网络或修复面板', 2000))

                },  response => this.$copop.warn('检查失败，请检查网络或修复面板', 2000))
            } else this.$copop.info('Dev 模式无法使用SSL', 1500)
        },
        panelAPI(v) {
            if (!this.isDev) {
                const that = this
                this.$copop.load('正在检查···', 2000)
                this.$http.post('/config?action=get_token', {}).then(R => {

                    that.$copop.success('已载入~', 1500)
                    that.$store.commit('thisConfig/updateIsAPI', {
                        token: R.data.token,
                        limit_addr: R.data.limit_addr,
                        open: R.data.open
                    })
                    that.$store.commit('thisConfig/changeShowAPI', true)

                }, response => this.$copop.warn('获取失败，请检查网络或修复面板', 2000))
            } else this.$copop.info('Dev 模式无法使用API', 1500)
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev'])
    },
    components: {
        panelSsl,
        panelApi
    }
}
</script>

<style lang="less" scoped>
.stickySettings {
    width: 100%;
    min-height: 60px;
    position: relative;
    border-radius: 2px;
    background-color: rgba(81, 81, 81, 0.48);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .item {
            position: relative;
            margin: 8px 5px;
            height: 45px;
            min-width: 65px;
            border-radius: 0 2px 2px 0;
            display: flex;
            justify-content: center;
            .el-divider {
                margin: 4px auto;
                width: 80%;
                background-color: #c5c5c5;
            }
            .title {
                color: #e6e6e6;
                font-size: 12px;
                line-height: 1;
                text-align: center;
            }
            .switch {
                min-width: 50px;
                position: relative;
                display: inline-block;
                margin: 0;
                height: 20px;
                outline: none;
                border: 1px solid #515151;
                border-radius: 2px;
                background: #515151;
                vertical-align: middle;
                cursor: pointer;
                transition: border-color 0.3s, background-color 0.3s;
            }
            .switch-click {
                border-color: #303030;
                background-color: #303030;
            }
            .switch-click:after {
                left: 100% !important;
                margin-left: -17px;
                background-color: #515151;
            }
            .switch:after {
                position: absolute;
                top: 1px;
                left: 1px;
                width: 16px;
                height: 16px;
                border-radius: 2px;
                background-color: #393939;
                content: "";
                transition: all 0.3s;
            }
        }
    }
}
</style>