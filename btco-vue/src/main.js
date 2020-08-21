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
import VueClipboard from 'vue-clipboard2'
import VeLine from 'v-charts/lib/line.common'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import requestCrypto from './lib/requestCrypto'

Vue.config.productionTip = false

requestCrypto(axios, CryptoJS)

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

Vue.component(VeLine.name, VeLine)

Vue.use(VueClipboard)
Vue.use(btcoPOP)
Vue.prototype._ = varGlobal
Vue.prototype.Call = new Vue()
Vue.prototype.$http = axios

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