<template>
    <div class="serverTime">
        <div>
            <div class="left">
                <i class="el-icon-time"></i>
                <div>服务器时间</div>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="right">
                <div>{{ serverTime }}</div>
                <el-button
                    size="mini"
                    icon="el-icon-refresh"
                    @click="Synchronize()"
                >同步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        Synchronize() {
            const that = this
            if (!this.isDev) {
                this.$copop.load('正在同步时间', 3500)
                this.$http.post('/config?action=syncDate', {}).then(R => {

                    that.$copop.success('同步成功', 1500)
                    that.Call.$emit('reloadGetConfig')

                }, response => that.$copop.warn('同步失败，请检查网络或修复面板'))
            } else if (that.isDev) that.$copop.warn('Dev 模式不支持同步时间')
        }
    },
    computed: {
        ...mapGetters('thisConfig', ['serverTime']),
        timeOut: {
            get() { return this.serverTime },
            set(v) { this.$store.commit('thisConfig/updatePanelIs', ['serverTime', v]) }
        }
    }
}
</script>

<style lang="less" scoped>
.serverTime {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    border-radius: 2px;
    background-color: rgba(81, 81, 81, 0.48);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .left {
            min-width: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 0;
            > i {
                color: #fff;
                font-size: 12px;
            }
            > div {
                color: #fff;
                font-size: 12px;
                margin-left: 8px;
            }
        }
        .el-divider {
            margin: 0;
            background-color: #fff;
            height: 55%;
        }
        .right {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
                font-size: 12px;
                color: #fff;
                padding: 0 15px;
                text-align: center;
            }
            > button {
                margin: 0 5px;
            }
        }
    }
}
</style>