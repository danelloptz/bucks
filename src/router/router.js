import { createRouter, createWebHistory } from 'vue-router'

import AppLogin from '@/views/auth/AppLogin.vue'
import AppSignup from '@/views/auth/AppSignup.vue'
import AppHome from '@/views/lk/AppHome.vue'

const routes = [
  { path: '/', component: AppLogin },
  { path: '/signup', component: AppSignup },
  { path: '/home', component: AppHome },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
