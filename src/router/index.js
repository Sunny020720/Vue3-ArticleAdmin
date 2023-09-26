import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 地址栏不带 #
  // createHashHistory 带#
  routes: []
})
export default router
