import request from '@/utils/request'
// 1.注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', {
    username,
    password,
    repassword
  })
// 2.登录
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', {
    username,
    password
  })
// 3.获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')
// 4.更新用户信息
export const userUpdateInfoService = ({ id, nickname, email }) => {
  return request.put('/my/userinfo', { id, nickname, email })
}
// 5.更换头像
export const userUploadAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}
