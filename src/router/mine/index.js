export default {
  path: '/mine',
  component: () => import('@/views/mine'),
  children: [
    {
      path: 'login',
      component: () => import('@/components/Login')
    },
    {
      path: 'center',
      component: () => import('@/views/mine/center.vue')
    },
    {
      path: 'register',
      component: () => import('@/components/Register')
    },
    {
      path: 'findPassword',
      component: () => import('@/components/FindPassword')
    },
    {
      path: '',
      redirect: 'center'
    }
  ]
}
