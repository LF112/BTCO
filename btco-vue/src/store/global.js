const state = {
    thisRouter: ''
}

const getters = {
    thisRouter: () => state.thisRouter
}

const mutations = {
    updateThisRouter(state, routerName) {
        state.thisRouter = routerName
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
