<template>
    <main>
        <div class="Container">
            <div>
                <div
                    class="wrapperMain"
                    id="mainBTCO"
                >
                    <router-view />
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="less" scoped>
@defaultHeight: 50px;
main {
    position: relative;
    min-height: 100%;
    overflow-x: hidden;
    margin-top: 42px;
    .Container {
        position: relative;
        min-height: @defaultHeight;
        background-size: cover;
        background-position: 50%;
        overflow: initial;
        > div {
            width: 100%;
            padding: 0 12px;
            .wrapperMain {
                min-height: @defaultHeight;
                margin: 0 auto;
                padding: 12px 0;
                position: relative;
            }
        }
    }
}
</style>