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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            sticky: [
                { name: '开发者模式', fun: 'devMode', tip: '此功能普通用户请勿开启！', open: false }
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
        devMode(v) {
            const that = this
            this.$copop.load('正在' + (v ? '启用' : '禁用') + '开发者模式···', 2000)
            this.$http.post('/config?action=set_debug', {}, { emulateJSON: true }).then(R => {
                that.$copop.success('已' + (v ? '启用' : '禁用') + '成功!', 1500)
            }, response => this.$copop.warn((v ? '启用' : '禁用') + '失败，请检查网络或修复面板', 2000))
        }
    },
    computed: {
        ...mapGetters('Global', ['isDev'])
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
.stickySettings {
    width: 100%;
    min-height: 60px;
    margin-top: 10px;
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
            text-align: center;
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