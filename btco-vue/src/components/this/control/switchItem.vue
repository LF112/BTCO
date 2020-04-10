<template>
    <div class="switchItem">
        <div class="open">
            <span>监控开关</span>
            <div
                :class="'switch' + (switchOpen ? ' switch-click' : '')"
                @click="isSwitch()"
            ></div>
        </div>
        <div class="this">
            <div class="header">
                <i class="el-icon-date"></i>
                <div class="title">监控配置 [单位: /天]</div>
                <nav></nav>
                <el-button
                    size="mini"
                    type="primary"
                    @click="cleanControl()"
                >清空</el-button>
            </div>
            <div class="day">
                <el-input-number
                    size="mini"
                    v-model="thisDayNum"
                    :precision="0"
                ></el-input-number>
                <nav></nav>
                <el-button
                    size="mini"
                    icon="el-icon-check"
                    @click="saveChange()"
                >更改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        isSwitch() {
            const that = this
            this.$store.commit('thisControl/changeSwitchOpen', (this.switchOpen ? false : true))
            this.$copop.load('正在' + (this.switchOpen ? '启用' : '关闭') + '···', 2500)
            this.$http.post('/config?action=SetControl', {
                type: (this.switchOpen ? 1 : 0),
                day: this.isDay
            }, { emulateJSON: true }).then(R => {

                if (R.data.status)
                    that.$copop.success((this.switchOpen ? '启用' : '关闭') + '成功')
                else that.$copop.warn(R.data.msg)

            }, response => this.$copop.warn((this.switchOpen ? '启用' : '关闭') + '失败，请检查网络或修复面板', 2500))
        },
        saveChange () {
            const that = this
            this.$copop.infoUse('现在保存监控天数？', v => {
                if (v) 
                    if (!that.isDev) {
                        that.$copop.load('正在保存···', 2500)
                        that.$http.post('/config?action=SetControl', {
                            type: 1,
                            day: that.isDay
                        }, { emulateJSON: true }).then(R => {

                            if (R.data.status)
                                that.$copop.success('保存成功', 1500)
                            else that.$copop.warn(R.data.msg)

                        }, response => that.$copop.warn('保存失败，请检查网络或修复面板', 2000))
                    } else that.$copop.warn('Dev 模式无法配置监控', 1500)
            })
        },
        cleanControl() {
            const that = this
            this.$copop.infoUse('现在清空监控？', v => {
                if (v) 
                    if (!that.isDev) {
                        that.$copop.load('正在清空···', 2500)
                        that.$http.post('/config?action=SetControl', { type: 'del' }, { emulateJSON: true }).then(R => {
                            that.$copop.load('正在重启面板服务······')
                            that.$http.get('/system?action=ReWeb').then(R => {
                                that.$copop.success('服务已重启！')
                                that.Call.$emit('ReloadControl')
                            })
                        }, response => that.$copop.warn('清空失败，请检查网络或修复面板', 2000))
                    }
            })
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisControl', ['switchOpen', 'isDay']),
        thisDayNum: {
            get() { return this.isDay },
            set(v) {
                this.$store.commit('thisControl/updateIsDay', v)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.switchItem {
    width: 100%;
    height: 65px;
    position: relative;
    display: flex;
    align-items: center;
    > div {
        border-radius: 2px;
        background-color: rgba(81, 81, 81, 0.48);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    }
    .open {
        height: 100%;
        padding: 12px 10px;
        border-radius: 2px;
        display: inline-grid;
        > span {
            color: #fff;
            font-size: 12px;
            text-align: center;
            margin-bottom: 2px;
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
    .this {
        width: 100%;
        height: 100%;
        position: relative;
        display: inline-grid;
        margin-left: 12px;
        .header {
            width: 100%;
            padding: 4px;
            display: flex;
            align-items: center;
            background: #303030;
            border-radius: 2px 2px 0 0;
            > i {
                color: #fff;
                font-size: 12px;
                margin: 0 5px;
            }
            .title {
                color: #fff;
                font-size: 12px;
            }
            .el-button {
                color: #fff;
                padding: 4px 7px;
                background: #393939;
                margin-right: 5px;
            }
        }
        .day {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 8px;
            .el-input-number {
                margin-right: 8px;
            }
            > button {
                color: #fff;
            }
        }
        nav {
            flex-grow: 1;
            flex-shrink: 0;
        }
    }
}
</style>