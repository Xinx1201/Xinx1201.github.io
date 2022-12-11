import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/Time',
    children: [
      {
        path: 'Fame',
        name: 'Fame',
        component: () => import('@/views/Fame'),
      },
      {
        path: '/Time',
        name: 'Time',
        component: () => import('@/views/Time'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
