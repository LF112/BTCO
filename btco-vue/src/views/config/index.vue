<template>
    <div class="configCo">
        <stickySettings />
        <stickySettingOther />
    </div>
</template>

<script>
import stickySettings from '@/components/this/config/stickySettings'
import stickySettingOther from '@/components/this/config/stickySettingOther'
import { mapGetters } from 'vuex'
export default {
    mounted() {
        this.configGet()
    },
    methods: {
        configGet() {
            const that = this
            if (!this.isDev) 
                this.$http.get('/config').then(() => {  // 此处宝塔官方没回复我解决方案，我的解决方案请求一遍 /config
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
        stickySettingOther
    }
}
</script>

<style lang="less" scoped>
.configCo {
    position: relative;
    width: 100%;
}
</style>