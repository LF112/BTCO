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
    }
}

const getters = {
    isHTTPS: () => state.isHTTPS,
    showSslChange: () => state.showSslChange,
    isSSL: () => state.isSSL,
    showAPI: () => state.showAPI,
    isAPI: () => state.isAPI
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