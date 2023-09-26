import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)

export default pinia

//仓库 统一导出
// import { useUserStore } from '@/stores/modules/user'
// export { useUserStore }
// import { useCountStore } from '@/stores/modules/counter'
// export { useCountStore }
export * from './modules/user'
export * from './modules/counter'
