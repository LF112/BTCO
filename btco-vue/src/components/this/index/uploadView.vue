<template>
    <div
        class="uploadView"
        ref="uploadView"
        style="opacity: 0; display: none"
    >
        <div>
            <div class="head">
                <div>
                    <i
                        :style="(changeStatus ? 'color: #f56c6c' : '')"
                        :class="(changeStatus ? 'el-icon-warning-outline' : (openUV.upload ? 'el-icon-refresh' : 'el-icon-circle-check'))"
                    ></i>
                    <div :style="(changeStatus ? 'color: #f56c6c' : '')">{{ 
                        changeStatus ? 
                            '请查看' + (isTEST ? '正式版' : '测试版' ) + '版本变化'
                        : (openUV.upload ? 
                            '有新版本 -> ' + (isTEST ? 'T'
                            : 'V') + openUV[(isTEST ? 'beta' : 'default')].version : '当前为最新版')
                    }}</div>
                </div>
            </div>
            <div class="main">
                <div>
                    <p v-html="openUV[(isTEST ? (changeStatus ? 'default' : 'beta') : (changeStatus ? 'beta' : 'default'))].UPLOG"></p>
                </div>
            </div>
            <div class="bottom">
                <div class="version">
                    <div>{{ (changeStatus ? (isTEST ? '正式版' : '测试版') : (isTEST ? '测试版' : '正式版')) }}</div>
                    <el-divider direction="vertical"></el-divider>
                    <div>{{ openUV[(isTEST ? (changeStatus ? 'default' : 'beta') : (changeStatus ? 'beta' : 'default'))].version }}</div>
                </div>
                <div class="button">
                    <el-button
                        size="mini"
                        :icon="(changeStatus ? 'el-icon-check' : 'el-icon-refresh-right')"
                        :type="(changeStatus ? 'success' : '')"
                        @click="changeVersion(isTEST)"
                    >{{ (changeStatus ? '就绪' : (isTEST ? '正式版' : '测试版')) }}</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="close()"
                    >取消</el-button>
                    <el-button
                        v-if="openUV.upload"
                        size="mini"
                        type="success"
                    >升级</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        close() {
            this.$refs.uploadView.style.opacity = 0
            setTimeout(() => this.$refs.uploadView.style.display = 'none', 500)
            this.openUV.show = false
            this.changeStatus = false
            this.$store.commit('thisIndex/changeOpenUV', this.openUV)
        },
        changeVersion( i ) {
            if (i)
                if (this.changeStatus){ // 正式版

                } else this.changeStatus = true
            else if (this.changeStatus){ // 测试版

            } else this.changeStatus = true
        }
    },
    watch: {
        'openUV.show': function (v) {
            if(v) {
                this.$refs.uploadView.style.display = 'flex'
                setTimeout(() => this.$refs.uploadView.style.opacity = 1, 1)
            } else {
                this.$refs.uploadView.style.opacity = 0
                setTimeout(() => this.$refs.uploadView.style.display = 'none', 500)
            }
        }
    },
    data () {
        return {
            changeStatus: false
        }
    },
    computed: {
        ...mapGetters('thisIndex', ['openUV', 'isTEST'])
    }
}
</script>

<style lang="less" scoped>
.uploadView {
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
                width: 80%;
                > p {
                    color: #fff;
                    font-size: 12px;
                }
            }
        }
        .bottom {
            width: 100%;
            position: relative;
            margin-top: 8px;
            display: flex;
            .version {
                padding: 2px;
                width: 140px;
                border-radius: 0 2px 0 2px;
                /*background: #303030;*/
                margin-bottom: 8px;
                margin-left: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                .el-divider {
                    background: #fff;
                }
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