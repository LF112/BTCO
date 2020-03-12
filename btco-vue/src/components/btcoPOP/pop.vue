<template>
    <div
        class="btcoPOP"
        ref="popis"
        style="height: 0px"
        v-if="visible"
    >
        <div>
            <div class="main">
                <div class="icon">
                    <i
                        :class="iconClass"
                        :style="{ 'color': iconColor }"
                    ></i>
                </div>
                <div class="text">{{ msg }}</div>
                <div
                    class="Button"
                    v-if="callback !== null"
                >
                    <i
                        class="el-icon-check"
                        @click="callback(true) || hide()"
                    ></i>
                    <i
                        class="el-icon-close"
                        @click="callback(false) || hide()"
                    ></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        if (this.timeout > 0)
            setTimeout(() => this.hide(), this.timeout)
        setTimeout(() => this.$refs.popis.style.height = '48px', 1)
    },
    methods: {
        hide() {
            this.$refs.popis.style.height = '0px'
            this.$refs.popis.style.marginBottom = '0px'
            setTimeout(() => this.visible = false, 500)
        }
    },
    data() {
        return {
            visible: true,
            timeout: 1500,
            msg: '...',
            iconClass: {
                'el-icon-warning-outline': true
            },
            iconColor: '#fff',
            callback: null
        }
    }
}
</script>

<style lang="less" scoped>
.btcoPOP {
    position: relative;
    margin-bottom: 10px;
    max-width: 100%;
    min-width: 60%;
    overflow: hidden;
    > div {
        width: 100%;
        min-height: 48px;
        border-radius: 2px;
        background-color: rgba(81, 81, 81, 0.48);
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
        .main {
            position: relative;
            min-height: 48px;
            overflow: hidden;
            padding: 14px 15px 14px 20px;
            display: flex;
            align-items: center;
            .icon {
                display: flex;
                margin-right: 10px;
                > i {
                    color: #fff;
                    font-size: 16px;
                }
            }
            .text {
                padding-right: 16px;
                font-size: 14px;
                line-height: 1.4;
                color: #fff;
            }
            .Button {
                position: absolute;
                right: 14px;
                > i {
                    color: #fff;
                    margin-left: 20px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>