<template>
    <div id="BTCO">
        <viewHeader />
        <viewMain />
        <viewFooter />
    </div>
</template>

<script>
import viewMain from '@/views/viewMain.vue'
import viewHeader from '@/views/viewHeader.vue'
import viewFooter from '@/views/viewFooter.vue'

import Vue from 'vue'
export default {
    mounted() {

        // Dev
        if (process.env.NODE_ENV === 'production')
            this.$store.commit('Global/changeIsDev', false)
        else this.$store.commit('Global/changeIsDev', true)

        // BT TOKEN
        const isBTtoken = document.getElementById('BTCO_BTTOKEN_REQUEST').getAttribute('co-token'),
            isCookieToken = this._.Tool.Cookie('request_token')
        if (process.env.NODE_ENV === 'production')
            Vue.http.interceptors.push((request, next) => {
                request.headers.set('x-http-token', isBTtoken)
                request.headers.set('x-cookie-token', isCookieToken)
                next((response) => {
                    return response
                })
            })

    },
    components: {
        viewMain,
        viewHeader,
        viewFooter
    }
}
</script>

<style lang="less">
*,
body,
html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    background: 0 0;
    word-wrap: break-word;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    font-family: Titillium Web, -apple-system, system-ui, BlinkMacSystemFont,
        Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
        Helvetica Neue, sans-serif;
}

a {
    text-decoration: none;
    cursor: pointer;
    color: #f2f2f2;
}

ul {
    list-style: none;
    li {
        font-size: 14px;
        line-height: 1.8;
    }
}

body {
    position: relative;
    background-color: #303030;
    background-size: cover;
}

:not(body) {
    transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98);
}

::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0.05);
    width: 6px;
    height: 6px;
    -webkit-appearance: none;
    border-radius: 6px;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
    background: transparent;
    display: none;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
    background: transparent;
    display: none;
}

::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
    background: transparent;
    display: none;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
    background: transparent;
    display: none;
}

::selection {
    background: #b2b8c1;
    color: #0bf;
}
</style>
