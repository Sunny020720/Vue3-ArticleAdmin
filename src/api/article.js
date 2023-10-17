import request from '@/utils/request'
//1.获取频道列表
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}
