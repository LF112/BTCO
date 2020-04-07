<template>
    <footer>
        <div>
            <div class="link">
                <isIcon
                    i="btco"
                    class="btcoLOGO"
                ></isIcon>
                <p>BTCO</p>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="text">
                <div>
                    <p>Made with love by LF112</p>
                </div>
                <div>
                    <p>This page is powered by BTCO in BT-Panel.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="less" scoped>
footer {
    position: relative;
    width: 100%;
    padding: 0 18px 8px;
    > div {
        display: flex;
        align-items: center;
        .link {
            text-align: center;
            .btcoLOGO {
                width: 30px;
                height: 30px;
                display: block;
                margin-bottom: 4px;
            }
            > p {
                color: hsl(221, 12%, 64%);
                font-weight: 700;
                line-height: 1;
                font-size: 12px;
            }
        }
        .el-divider {
            background-color: hsla(0, 0%, 100%, 0.26);
            margin: 0 18px;
            height: 2em;
        }
        .text {
            width: 100%;
            text-align: center;
            font-size: 12px;
            p {
                color: hsla(0, 0%, 100%, 0.19);
            }
        }
    }
}
</style>