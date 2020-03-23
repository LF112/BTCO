const state = {
    isHTTPS: false,
    showSslChange: false,
    isSSL: {
        cert_type: '',
        email: '',
        domain: '',
        ssl: {
            privateKey: '',
            certPem: ''
        }
    },
    showAPI: false,
    isAPI: {
        token: '',  // 获不获取无所谓...
        limit_addr: '',
        open: false
    },

    showTwoVerify: false,
    Is: {
        sticky: {
            ipv6: false,
            api: false,
            debug: false,
            local: false
        }
    },
    IsTwoVerify: {
        status: false,
        info: {
            key: '****',
            username: 'BTCO'
        },
        qrcode: 'unknow'
    }
}

const getters = {
    isHTTPS: () => state.isHTTPS,
    showSslChange: () => state.showSslChange,
    isSSL: () => state.isSSL,
    showAPI: () => state.showAPI,
    isAPI: () => state.isAPI,
    showTwoVerify: () => state.showTwoVerify,
    Is: () => state.Is,
    IsTwoVerify: () => state.IsTwoVerify
}

const mutations = {
    changeIsHTTPS(state, status) {
        state.isHTTPS = status
    },
    changeShowSslChange(state, status) {
        state.showSslChange = status
    },
    updateIsSSL(state, ssl) {
        state.isSSL = ssl
    },
    changeShowAPI(state, status) {
        state.showAPI = status
    },
    updateIsAPI(state, api) {
        state.isAPI = api
    },
    changeShowTwoVerify(state, status) {
        state.showTwoVerify = status
    },
    updateIsTwoVerify(state, arr) {
        state.IsTwoVerify = arr
    },
    updateIs(state, arr) {
        state.Is = arr
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