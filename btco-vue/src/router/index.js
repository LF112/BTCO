import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: '首页',
            component: () => import('../views/index/index.vue')
        },
        {
            path: '/about',
            name: '关于',
            component: () => import('../views/index/index.vue')
        }
    ]
})

router.afterEach((to, from) => {
    router.app.$store.commit('Global/updateThisRouter', to.name)
})

export default router