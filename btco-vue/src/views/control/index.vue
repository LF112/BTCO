<template>
    <div class="controlCo">
        <switchItem />
        <!--<loadAverage />-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import switchItem from '@/components/this/control/switchItem'

//import loadAverage from '@/components/this/control/chart/loadAverage'
export default {
    mounted() {
        if (!this.isDev)
            this.network()
        this.Call.$on('ReloadControl', () => this.network())
    },
    methods: {
        network() {
            const that = this
            this.$copop.load('正在获取配置···', 1500)
            this.$http.post('/config?action=SetControl', { type: -1 }, { emulateJSON: true }).then(R => {
                if (that.load) {
                    that.$copop.success('重试成功', 2500)
                    that.load = false
                } else that.$copop.success('获取成功', 1500)

                that.$store.commit('thisControl/changeSwitchOpen', R.data.status)
                that.$store.commit('thisControl/updateIsDay', R.data.day)

            }, response => this.$copop.warnUse('监控配置获取失败，重试？', v => {
                if (v) {
                    that.load = true
                    that.network()
                } else that.$copop.warn('配置监控将会发生异常')
            }))
        }
    },
    data() {
        return {
            load: false
        }
    },
    components: {
        switchItem,

        //loadAverage
    },
    computed: {
        ...mapGetters('Global', ['isDev'])
    }
}
</script>

<style lang="less" scoped>
.controlCo {
    position: relative;
    width: 100%;
}
</style>