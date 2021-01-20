export default {
  path: '/movie',
  component: () => import('@/views/movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'comingsoon',
      component: () => import('@/components/Comingsoon')
    },
    {
      path: 'nowplaying',
      component: () => import('@/components/Nowplaying')
    },
    {
      path: 'search',
      component: () => import('@/components/Search')
    },
    {
      path: 'detail/1/:id', // 动态路由（分1，2是为了和即将上映部分区分）
      components: {
        default: () => import('@/components/Nowplaying'), // 这个是为了解决，detail页面加载动画时，背景页面直接变白（原因，路由匹配detail页面时，Nowplaying页面就不匹配了）（default会指向没有名字的路由组件，所以Nowplaying路由的<router-view>标签不要添加name，添加了的话default就要改为name值）
        detail: () => import('@/views/movie/detail')
      },
      // props: true // 单个显示区域写法
      props: { // 多个显示区域写法
        detail: true// 准许路由传参（detail是根据动态路由名字而变化的）（调用写法：先在data同级写上props: ['id'],然后调用就写this.id）
      }
    },
    {
      path: 'detail/2/:id',
      components: {
        default: () => import('@/components/Comingsoon'),
        detail: () => import('@/views/movie/detail')
      },
      props: {
        detail: true
      }
    },

    // 写法b
    // {
    //   path: '/detail/:id', // /detail/:myid  必须要写:（冒号） 动态路由（用来自动添加商品信息）（不管用两种方法中的哪种都要写）
    //   name: 'kerwindetail', // 但是用路径跳转的话不用写这个
    //   component: detail
    // },

    {
      path: '',
      redirect: 'nowplaying'
    }
  ]
}
