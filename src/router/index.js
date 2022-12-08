import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Home',
    children: [
      {
        path: 'Home',
        component: () => import('@/views/Home'),
        name: 'Home',
        meta: {
          title: '首页',
        },
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
