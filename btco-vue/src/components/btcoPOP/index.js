import POP from '@/components/btcoPOP/pop'

let BTCOPOP = {}
BTCOPOP.install = (Vue) => {

    let btcoDOM, thisPOP, isClass = {}

    Vue.prototype.$copop = {

        that(MSG, timeout, callback = null, iconColor = '#fff', iconClass = 'el-icon-warning') {

            thisPOP = Vue.extend(POP)
            thisPOP = new thisPOP()

            thisPOP.timeout = timeout
            thisPOP.msg = MSG
            thisPOP.iconColor = iconColor

            isClass[iconClass] = true
            thisPOP.iconClass = isClass
            isClass = {}

            if (callback !== null)
                thisPOP.callback = callback

            thisPOP.$mount(document.createElement('div'))
            btcoDOM = document.getElementById('mainBTCO')
            btcoDOM.insertBefore(thisPOP.$el, btcoDOM.firstChild)

        },

        info(MSG, timeout) {
            this.that(MSG, timeout, null, '#909399', 'el-icon-warning-outline')
        },
        infoUse(MSG, callback) {
            this.that(MSG, 0, callback, '#909399', 'el-icon-warning-outline')
        },
        load(MSG, timeout) {
            this.that(MSG, timeout, null, '#53a8ff', 'el-icon-loading')
        },
        loadUse(MSG, callback) {
            this.that(MSG, 0, callback, '#53a8ff', 'el-icon-loading')
        },
        warn(MSG, timeout) {
            this.that(MSG, timeout, null, '#f56c6c')
        },
        warnUse(MSG, callback) {
            this.that(MSG, 0, callback, '#f56c6c')
        },
        success(MSG, timeout) {
            this.that(MSG, timeout, null, '#67c23a', 'el-icon-success')
        },
        successUse(MSG, callback) {
            this.that(MSG, 0, callback, '#67c23a', 'el-icon-success')
        }


    }
}

export default BTCOPOP