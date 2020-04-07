const state = {
    thisRouter: '',
    isSiteNickname: '',
    isDev: false,
    reloadServerStatus: false
}

const getters = {
    thisRouter: () => state.thisRouter,
    isSiteNickname: () => state.isSiteNickname,
    isDev: () => state.isDev,
    reloadServerStatus: () => state.reloadServerStatus
}

const mutations = {
    updateThisRouter(state, routerName) {
        state.thisRouter = routerName
    },
    updateIsSiteNickname(state, nickname) {
        state.isSiteNickname = nickname
    },
    changeIsDev(state, status) {
        state.isDev = status
    },
    changeReloadServerStatus(state, status) {
        state.reloadServerStatus = status
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
