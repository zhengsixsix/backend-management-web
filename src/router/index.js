import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '@/components/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
      meta: {
        title: '登录',
        noCache: true,
      },
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: () => import('@/components/Welcome'),
          meta: {
            title: '主页',
            affix: true,
            noCache: true,
          },
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users/Users'),
          meta: {
            title: '用户管理',
            noCache: true,
          },
        },
        {
          path: '/permits/roles',
          name: 'roles',
          component: () => import('@/views/roles/Roles'),
          meta: {
            title: '角色管理',
            noCache: true,
          },
        },
        {
          path: '/permits/permits',
          name: 'permits',
          component: () => import('@/views/permits/Permits'),
          meta: {
            title: '权限管理',
            noCache: true,
          },
        },
        {
          path: '/goods',
          name: 'goods',
          component: () => import('@/views/goods/Goods'),
          meta: {
            title: '商品管理',
            noCache: true,
          },
        },
        {
          path: '/other',
          name: 'other',
          component: () => import('@/views/others/Other'),
          meta: {
            title: '其它',
            noCache: true,
          },
        },
        {
          path: '/lang',
          name: 'lang',
          component: () => import('@/views/langs/Lang'),
          meta: {
            title: '国际化管理',
            noCache: true,
          },
        },
      ],
    },
    { path: '*', name: '*', component: () => import('@/components/404') },
  ],
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const token = store.getters.token
  if (!token && to.name != LOGIN_PAGE_NAME) {
    next({ name: LOGIN_PAGE_NAME })
  } else {
    next()
  }
})

export default router
