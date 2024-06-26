
import { createRouter, createWebHistory } from 'vue-router'

// 引入 ./routes.js 的默认值
import routes from './routes'

/* const routess = [
  // 首页路由配置
  {
    path: '/',
    name: 'Home',
    // component: () => import('@/views/Home')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
   // EditUsers
   {
    // path: '/users/1/edit',
    // name: 'EditUsers',
    // component: () => import('@/views/users/Edit')
  },
  // 其他未配置的路由都跳转到首页
 /*  {
    path: '/:catchAll(.*)',
    // 重定向
    redirect: '/'
  }

] */



const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',

// routes.js文件？
  routes
})

/* router.beforeEach((to, from, next) => {
  const auth = router.app.$options.store.state.auth

  if (
    (auth && to.path.indexOf('/auth/') !== -1) ||
    (!auth && to.meta.auth)
  ) {
    next('/')
  } else {
    next()
  }
}

) */


export default router
