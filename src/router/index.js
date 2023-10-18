import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main'),
    children: [
      {
        path: '',
        redirect: '/main/recommend'
      },
      {
        path: '/main/recommend',
        component: () => import('../views/main/recommend.vue')
      },
      {
        path: '/main/musictop',
        component: () => import('../views/main/musictop')
      },
      {
        path: '/main/musiclist',
        component: () => import('../views/main/musiclist.vue')
      },
      {
        path: '/main/dayrecommend',
        component: () => import('../views/main/dayrecommend.vue')
      },
    ]
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('../views/mv/mv.vue'),
    children: [
      {
        path: '',
        redirect: '/mv/mvlist'
      },
      {
        path: '/mv/mvlist',
        component: () => import('../views/mv/mvlist.vue')
      },
      {
        path: '/mv/mvplay',
        component: () => import('../views/mv/mvplay.vue')
      },
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/my')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('../views/playlist')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('../views/singer')
  },
  {
    path: '/search',
    name: '/search',
    component: () => import('../views/search/search.vue')
  },
  {
    path: '/:pathMatch(.*)*',//当匹配不到时,跳转的页面
    name: '/not-found',
    component: () => import('../views/not-found/notfound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to) => {
//   const store = useStore()
//   if (to.path) {
//     // 获取本地内存的token
//     const userinfo = LocalCache.getCache('userinfo')
//     console.log(store);
//     if (userinfo) {
//       store.commit('changeUserInfo', userinfo)
//     }
//   }
// })


export default router
