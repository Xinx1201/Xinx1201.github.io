import Layout from '@/Layout'

export default {
  path: '/',
  component: Layout,
  redirect: 'Fame',
  children: [
    {
      path: '/Fame',
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
    {
      path: '/Test',
      name: 'Test',
      component: () => import('@/views/Test'),
      meta: {
        title: '测试页面'
      }
    },
  ],
}
