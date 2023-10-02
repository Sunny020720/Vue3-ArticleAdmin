import request from '@/utils/request'
// 注册服务
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
