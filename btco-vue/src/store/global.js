const state = {
    thisRouter: '',
    isDev: false,
    reloadServerStatus: false
}

const getters = {
    thisRouter: () => state.thisRouter,
    isDev: () => state.isDev,
    reloadServerStatus: () => state.reloadServerStatus
}

const mutations = {
    updateThisRouter(state, routerName) {
        state.thisRouter = routerName
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
