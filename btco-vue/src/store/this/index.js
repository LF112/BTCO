const state = {
    version: 'v0.0.0',
    isPro: false,
    isIP: '0.0.0.0',
    isPY: '0.0',
    isTEST: false,
    runTime: '0天0小时0分钟',
    isSYS: {
        sys: 'BTCO Core 2.0',
        core: 'btco'    // SVG NAME
    },
    isWebServer: '',    // 重启服务器时需要

    thatWEB: 0,
    thatFTP: 0,
    thatDATABASE: 0,

    networkUP: '',
    networkDown: '',
    downTotal: '',
    upTotal: '',

    openUV: {
        show: false,
        upload: false,
        default: {
            version: '0.0.0',
            time: '2020/01/01',
            UPLOG: 'NONE'
        },
        beta: {
            version: '0.1.0',
            time: '2020/01/02',
            UPLOG: 'NONE'
        }
    }
}

const getters = {
    version: () => state.version,
    isPro: () => state.isPro,
    isIP: () => state.isIP,
    isSYS: () => state.isSYS,
    isPY: () => state.isPY,
    isTEST: () => state.isTEST,
    runTime: () => state.runTime,
    isWebServer: () => state.isWebServer,

    thatWEB: () => state.thatWEB,
    thatFTP: () => state.thatFTP,
    thatDATABASE: () => state.thatDATABASE,

    networkUP: () => state.networkUP,
    networkDown: () => state.networkDown,
    downTotal: () => state.downTotal,
    upTotal: () => state.upTotal,

    openUV: () => state.openUV
}

const mutations = {
    changeVersion(state, version) {
        state.version = version
    },
    changeIsPro(state, status) {
        state.isPro = status
    },
    changeIsIP(state, ip) {
        state.isIP = ip
    },
    changeIsSYS(state, sys) {
        state.isSYS = sys
    },
    changeIsPY(state, version) {
        state.isPY = version
    },
    changeIsTEST(state, status) {
        state.isTEST = status
    },
    changeRunTime(state, time) {
        state.runTime = time
    },
    changeIsWebServer(state, webServer) {
        state.isWebServer = webServer
    },
    updateNetwork(state, up, down, downTotal, upTotal) {
        state.network = up
        state.network = down
        state.network = downTotal
        state.network = upTotal
    },
    updateOverview(state, web, ftp, database) {
        state.thatWEB = web
        state.thatFTP = ftp
        state.thatDATABASE = database
    },
    changeOpenUV(state, arr) {
        state.openUV = arr
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}