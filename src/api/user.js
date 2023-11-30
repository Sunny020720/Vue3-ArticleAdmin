import request from '@/utils/request'
// 1.注册
export const userRegisterService = ({ username, password }) =>
  request.post('/users/register', {
    username,
    password
  })
// 2.登录
export const userLoginService = ({ username, password }) =>
  request.post('/users/login', {
    username,
    password
  })
// 3.获取用户信息
export const userGetInfoService = () => request.get('/users/userinfo')
// 4.更新用户信息
export const userUpdateInfoService = ({ _id, nickname, email }) => {
  return request.put('/users/userinfo', { _id, nickname, email })
}
// 5.更换头像
export const userUploadAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', {
    avatar
  })
}
// 6.更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/users/updatepwd', { old_pwd, new_pwd, re_pwd })
}
