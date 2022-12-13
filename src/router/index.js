import Vue from 'vue'
import VueRouter from 'vue-router'
import menu from '@/router/modules'

Vue.use(VueRouter)

const routes = [
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    meta: {
      title: '401',
    },
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  ...menu,
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
