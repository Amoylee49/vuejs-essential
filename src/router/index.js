
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  }
]



const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',

// routes.js文件？
  routes
})


export default router
