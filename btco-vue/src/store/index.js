import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'
import thisIndex from './this/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Global,
        thisIndex
    }
})