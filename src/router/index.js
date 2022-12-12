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
        name: 'Fame',
        component: () => import('@/views/Fame'),
        meta: {
          title: '楚天社'
        }
      },
      {
        path: '/Time',
        name: 'Time',
        component: () => import('@/views/Time'),
        meta: {
          title: '刷马时间'
        }
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
