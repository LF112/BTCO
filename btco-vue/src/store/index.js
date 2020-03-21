import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'
import thisIndex from './this/index'
import thisConfig from './this/config'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Global,
        thisIndex,
        thisConfig
    }
})