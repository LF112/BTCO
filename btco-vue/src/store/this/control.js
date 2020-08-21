const state = {
    switchOpen: false,
    isDay: 0
}

const getters = {
    switchOpen: () => state.switchOpen,
    isDay: () => state.isDay
}

const mutations = {
    changeSwitchOpen (state, status) {
        state.switchOpen = status
    },
    updateIsDay (state, day) {
        state.isDay = day
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