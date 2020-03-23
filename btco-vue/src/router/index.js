import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {   // 首页
            path: '/',
            name: '首页',
            component: () => import('../views/index/index.vue')
        },
        {   // 网站
            path: '/site',
            name: '网站',
            component: () => import('../views/site/index.vue')
        },
        {   // FTP
            path: '/ftp',
            name: 'FTP',
            component: () => import('../views/ftp/index.vue')
        },
        {   // 数据库
            path: '/database',
            name: '数据库',
            component: () => import('../views/database/index.vue')
        },
        {   // 监控
            path: '/control',
            name: '监控',
            component: () => import('../views/control/index.vue')
        },
        {   // 安全
            path: '/firewall',
            name: '安全',
            component: () => import('../views/firewall/index.vue')
        },
        {   // 文件
            path: '/files',
            name: '文件',
            component: () => import('../views/files/index.vue')
        },
        {   // 计划任务
            path: '/crontab',
            name: '计划任务',
            component: () => import('../views/crontab/index.vue')
        },
        {   // 软件商店
            path: '/soft',
            name: '软件商店',
            component: () => import('../views/soft/index.vue')
        },
        {   // 面板设置
            path: '/config',
            name: '面板设置',
            component: () => import('../views/config/index.vue')
        }
    ]
})

NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
    router.app.$store.commit('Global/updateThisRouter', to.name)
})

export default router