import Vue from 'vue'
import {
    Icon,
    Button,
    Divider,
    Badge,
    Dropdown, DropdownMenu, DropdownItem
} from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/ICON'
import btcoPOP from '@/components/btcoPOP'
import varGlobal from '@/components/Global.vue'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.use(VueResource)
Vue.use(btcoPOP)
Vue.prototype._ = varGlobal

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#BTCO')

if (process.env.NODE_ENV === 'production') {
    console.clear()
    console.log(
        "\n %c \u26a1BTCO %c https://github.com/LF112/BTCO %c BY%c LF112  \n\n",
        "color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;",
        "background:rgba(197, 197, 197, 0.89); padding:5px 0;",
        "color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;", "color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;"
    )
}