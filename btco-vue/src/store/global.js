const state = {
    thisRouter: '',
    isDev: false,
}

const getters = {
    thisRouter: () => state.thisRouter,
    isDev: () => state.isDev
}

const mutations = {
    updateThisRouter(state, routerName) {
        state.thisRouter = routerName
    },
    changeIsDev(state, status) {
        state.isDev = status
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
