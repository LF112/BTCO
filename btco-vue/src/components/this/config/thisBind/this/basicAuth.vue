<template>
    <div
        class="BasicAuth"
        style="opacity: 0; display: none"
        ref="BasicAuth"
    >
        <div>
            <div class="head">
                <div>
                    <isIcon i=""></isIcon>
                    <div></div>
                </div>
            </div>
            <div class="main">
                <div>

                </div>
            </div>
            <div class="bottom">
                <div class="button">
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
export default {
    methods: {
        close() {
            this.$refs.BasicAuth.style.opacity = 0
            setTimeout(() => this.$refs.BasicAuth.style.display = 'none', 500)
            this.$store.commit('thisConfig/changeShowBasicAuth', false)
        }
    },
    watch: {
        showBasicAuth(v) {
            if(v) {
                this.$refs.BasicAuth.style.display = 'flex'
                setTimeout(() => this.$refs.BasicAuth.style.opacity = 1, 1)
            } else {
                this.$refs.BasicAuth.style.opacity = 0
                setTimeout(() => this.$refs.BasicAuth.style.display = 'none', 500)
            }
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev']),
        ...mapGetters('thisConfig', ['showBasicAuth'])
    }
}
</script>

<style lang="less" scoped>
.BasicAuth {
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