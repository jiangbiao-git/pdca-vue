import Vue from 'vue'
import VueRouter from 'vue-router'

if (!window.VueRouter) Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('@/views/home.vue')
    }, {
        path: '/task',
        name: 'Task',
        component: () =>
            import ('@/views/task/task.index.vue')
    },
    {
        path: '*',
        name: 'error_404',
        component: () =>
            import ('@/views/error/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/pdca',
    routes
})

export default router