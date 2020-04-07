import Vue from 'vue'
import {
    Icon,
    Input,
    Button,
    Select,
    Option,
    Divider,
    Badge,
    InputNumber,
    Dropdown, DropdownMenu, DropdownItem
} from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/ICON'
import btcoPOP from '@/components/btcoPOP'
import varGlobal from '@/components/Global.vue'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(Icon)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Divider)
Vue.use(Badge)
Vue.use(InputNumber)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.use(VueResource)
Vue.use(VueClipboard)
Vue.use(btcoPOP)
Vue.prototype._ = varGlobal
Vue.prototype.Call = new Vue()

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