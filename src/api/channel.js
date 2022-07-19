import request from '@/utils/request'
import storage from '@/utils/localStor'
// 获取我的频道
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 删除用户频道
/**
 *
 * @param {Number| String} target 删除用户频道id
 * @returns Pormise
 */
export const delUserChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

// 添加我的频道
/**
 *
 * @param {Number}  id 频道的id
 * @param {Number} seq 添加频道的索引
 * @returns
 */
export const addmyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 在本地存储中存和取我的频道数据

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'

export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelsToLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
