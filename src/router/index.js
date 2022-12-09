import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Fame',
    children: [
      {
        path: 'Fame',
        component: () => import('@/views/Fame'),
        name: 'Fame',
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
