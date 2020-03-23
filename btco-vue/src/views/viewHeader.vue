<template>
    <header>
        <div>
            <div class="BTPanel">
                <div>BTPanel</div>
            </div>
            <div class="defaultProfile">
                <div
                    class="IsPro"
                    :style="{'background-color': (isPro ? '#393939' : '#8c8c8c')}"
                >{{ isPro ? 'PRO' : 'FREE' }}</div>
                <div class="version">{{ version }}</div>
            </div>

            <div class="dropDownMenu">
                <el-dropdown
                    trigger="click"
                    @command="handleRouter"
                >
                    <span class="el-dropdown-link">
                        {{ thisRouter }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="首页">首页</el-dropdown-item>
                        <el-dropdown-item command="网站">网站</el-dropdown-item>
                        <el-dropdown-item command="FTP">FTP</el-dropdown-item>
                        <el-dropdown-item command="数据库">数据库</el-dropdown-item>
                        <el-dropdown-item command="监控">监控</el-dropdown-item>
                        <el-dropdown-item command="安全">安全</el-dropdown-item>
                        <el-dropdown-item command="文件">文件</el-dropdown-item>
                        <el-dropdown-item command="计划任务">计划任务</el-dropdown-item>
                        <el-dropdown-item command="软件商店">软件商店</el-dropdown-item>
                        <el-dropdown-item command="面板设置">面板设置</el-dropdown-item>
                        <el-dropdown-item
                            divided
                            command="exit"
                        >登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    methods: {
        handleRouter(to) {
            if (to !== 'exit' && to !== this.$route.name)
                this.$router.push({ name: to })
            else if (to == this.$route.name) 
                this.$copop.success(to + '已载入', 1500)
            else this.$copop.warnUse('现在登出面板吗？', v => {
                if (v && !this.isDev) window.location.href = '/login?dologin=True'
            })
        }
    },
    computed: {
        ...mapGetters('Global', ['thisRouter', 'isDev']),
        ...mapGetters('thisIndex', ['version', 'isPro'])
    }
}
</script>

<style lang="less" scoped>
header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #515151;
    box-shadow: 0 1px 5px 1px rgba(43, 43, 43, 0.5);
    z-index: 1000;
    > div {
        position: relative;
        max-width: 100%;
        min-width: 60%;
        height: 42px;
        margin: 0 auto;
        padding: 0 12px;
        display: flex;
        align-items: center;

        .BTPanel {
            position: relative;
            margin-left: 6px;
            margin-right: 18px;
            float: none;
            display: inline-block;
            > div {
                color: #fff;
                font-size: 16px;
                line-height: 1;
            }
        }
        .defaultProfile {
            position: relative;
            padding: 0 12px;
            border-radius: 3px;
            border-left: 3px solid rgb(57, 57, 57);
            .IsPro {
                padding: 3px 4px;
                border-radius: 2px;
                background-color: rgb(57, 57, 57);
                box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
                color: #fff;
                text-align: center;
                letter-spacing: 0.05em;
                font-weight: 600;
                font-size: 12px;
                line-height: 1;
            }
            .version {
                font-size: 12px;
                color: #fff;
                line-height: 1.3;
                text-align: center;
            }
        }
        .dropDownMenu {
            position: absolute;
            right: 12px;
            .el-dropdown-link {
                color: #fff;
                cursor: pointer;
            }
        }
    }
}
</style>