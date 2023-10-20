import request from '@/utils/request'
//1.获取频道列表
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
//2.添加分类
export const artAddChannelService = (data) => {
  return request.post('/my/cate/add', data)
}
//3.编辑分类
export const artEditChannelService = (data) => {
  return request.put('/my/cate/info', data)
}
