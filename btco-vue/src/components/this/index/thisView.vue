<template>
    <div class="thisView">
        <div>
            <div class="overview">
                <div class="PY">
                    <isIcon i="python"></isIcon>
                    <div>{{ isPY }}</div>
                </div>
            </div>
            <div class="run">
                <i class="el-icon-open"></i>
                <div class="time">{{ runTime }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('thisIndex', ['runTime', 'isPY'])
    }
}
</script>

<style lang="less" scoped>
.thisView {
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
        .overview {
            height: 100%;
            padding: 0 6px;
            text-align: center;
            .PY {
                height: 100%;
                display: flex;
                align-items: center;
                > svg {
                    width: 22px;
                    height: 22px;
                }
                > div {
                    color: #fff;
                    font-size: 14px;
                    padding-left: 5px;
                    line-height: 1;
                    font-weight: lighter;
                }
            }
        }
        .run {
            width: 100%;
            height: 100%;
            position: relative;
            margin-left: 2px;
            padding: 0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid hsl(0, 0%, 32%);
            > i {
                color: #fff;
                font-size: 14px;
            }
            .time {
                color: #fff;
                font-size: 14px;
                line-height: 1;
                margin-left: 5px;
                font-weight: lighter;
            }
        }
    }
}
</style>