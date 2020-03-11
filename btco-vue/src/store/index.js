import Vue from 'vue'
import Vuex from 'vuex'
import Global from "./global"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Global
    }
})