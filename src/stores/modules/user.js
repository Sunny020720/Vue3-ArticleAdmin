import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
export const useUserStore = defineStore(
  'my-user',
  () => {
    //1.token
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    //2.用户信息
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }

    return {
      token,
      user,
      setToken,
      removeToken,
      getUser
    }
  },
  {
    persist: true
  }
)
