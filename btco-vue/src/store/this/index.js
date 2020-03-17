const state = {
    version: 'v0.0.0',
    isPro: false,
    isIP: '0.0.0.0',
    isPY: '0.0',
    runTime: '1024天12小时33分钟',
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
    upTotal: ''
}

const getters = {
    version: () => state.version,
    isPro: () => state.isPro,
    isIP: () => state.isIP,
    isSYS: () => state.isSYS,
    isPY: () => state.isPY,
    runTime: () => state.runTime,
    isWebServer: () => state.isWebServer,

    thatWEB: () => state.thatWEB,
    thatFTP: () => state.thatFTP,
    thatDATABASE: () => state.thatDATABASE,

    networkUP: () => state.networkUP,
    networkDown: () => state.networkDown,
    downTotal: () => state.downTotal,
    upTotal: () => state.upTotal
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