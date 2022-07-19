import request from '@/utils/request'

// 获取文章新闻推荐
/**
 *
 * @param {*} channelId  频道ID
 * @param {*} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns Promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
