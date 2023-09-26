import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCountStore = defineStore(
  'my-count',
  () => {
    const count = ref(100)
    const add = (n) => {
      count.value = n
    }
    return {
      count,
      add
    }
  },
  {
    persist: true
  }
)
