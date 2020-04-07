<template>
    <div class="configCo">
        <stickySettings />
        <stickySettingOther />
        <thisBind />
        <thisFrom />
        <serverTime />
        <sessionTimeout />
        <panelPort />
        <panelAuthPath />
    </div>
</template>

<script>
import stickySettings from '@/components/this/config/thisSticky/settings'
import stickySettingOther from '@/components/this/config/thisSticky/settingOther'
import thisBind from '@/components/this/config/thisBind/index'
import thisFrom from '@/components/this/config/thisFrom/index'
import sessionTimeout from '@/components/this/config/thisFrom/number/timeout'
import serverTime from '@/components/this/config/thisFrom/serverTime'
import panelPort from '@/components/this/config/thisFrom/number/port'
import panelAuthPath from '@/components/this/config/thisFrom/other/authPath'
import { mapGetters } from 'vuex'
export default {
    mounted() {
        this.configGet()
        this.Call.$on('reloadGetConfig', v => {
            this.reload = true
            this.configGet()
        })
    },
    methods: {
        configGet() {
            const that = this
            if (!this.isDev) 
                this.$http.get('/config').then(() => {  // 'get_config 响应取决于前置请求'
                    that.$http.post('/config?action=get_config', {}).then(R => {
                        if (that.reload) {
                            that.$copop.success('重载成功~', 1500)
                            that.reload = false
                        }
                        that.$store.commit('thisConfig/updateIs', {
                            sticky: {
                                ipv6: (R.data.ipv6 == 'checked' ? true : false),
                                api: (R.data.api == 'checked' ? true : false),
                                debug: (R.data.debug == 'checked' ? true : false),
                                local: (R.data.is_local == 'checked' ? true : false)
                            }
                        })
                        that.$store.commit('thisConfig/updatePanelIs', ['panelDomain', R.data.panel.domain])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelLimitip', R.data.panel.limitip])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelSitesPath', R.data.sites_path])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelBackupPath', R.data.backup_path])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelIp', R.data.panel.address])
                        that.$store.commit('thisConfig/updatePanelIs', ['serverTime', R.data.systemdate])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelPort', R.data.panel.port])
                        that.$store.commit('thisConfig/updatePanelIs', ['panelAuthPath', R.data.panel.admin_path])

                        that.$store.commit('thisConfig/updatePanelIs', ['IsWechatApp', (R.data.wx === '当前未绑定微信号' ? '未绑定' : R.data.wx)])
                        that.$store.commit('thisConfig/updatePanelIs', ['IsBasicAuth', {
                            user: R.data.basic_auth.basic_user,
                            password: R.data.basic_auth.basic_pwd,
                            open: R.data.basic_auth.open,
                            value: R.data.basic_auth.value
                        }])
                    }, response => this.$copop.warnUse('配置信息获取失败，重试？', v => {
                        if (v) {
                            that.$copop.load('正在获取···', 2500)
                            that.reload = true
                            that.configGet()
                        }
                    }))
                    that.$http.post('/config?action=check_two_step', {}).then(R => {
                        that.$store.commit('thisConfig/updateIsTwoVerify', {
                            status: R.data.status,
                            info: {
                                key: '****',
                                username: 'BTCO'
                            },
                            qrcode: 'unknow'
                        })
                    }, response => this.$copop.warn('两步验证获取失败，请检查网络并刷新页面', 2000))
                    that.$http.get('/ssl?action=GetUserInfo').then(R => {
                        if (R.data.status)
                            that.$store.commit('thisConfig/updatePanelIs', ['IsBtAccount', R.data.data.username])
                        else that.$store.commit('thisConfig/updatePanelIs', ['IsBtAccount', '未绑定'])
                    }, response => this.$copop.warn('宝塔账号获取失败，请检查网络并刷新页面', 2000))
                }, response => this.$copop.warn('配置更新失败，请检查网络并刷新页面', 2000))
        }
    },
    data() {
        return {
            reload: false
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev'])
    },
    components: {
        stickySettings,
        stickySettingOther,
        thisBind,
        thisFrom,
        sessionTimeout,
        serverTime,
        panelPort,
        panelAuthPath
    }
}
</script>

<style lang="less" scoped>
.configCo {
    position: relative;
    width: 100%;
}
</style>