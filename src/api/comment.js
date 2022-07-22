import request from '@/utils/request'

// 获取文章评论
/**
 *
 * @param {String} letter  a为文章评论，b为对评论的回复
 * @param {Strimg,Number} id  文章的id
 * @returns  Promise
 */
export const getArtistComment = (letter, id, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: letter,
      source: id,
      offset,
      limit
    }
  })
}

// 对文章评论进行点赞
export const getcommentGoods = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: { target },
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 对文章评论进行取消点赞
export const setcommentGoods = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
    Headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 收藏文章

export const getCollection = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: { target }
  })
}

// 取消收藏
export const offCollection = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// 对文章或者评论进行评论
/**
 *
 * @param {String} target  评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {String} content  评论内容
 * @param {String} artid    文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @returns
 */
export const partFive = (target, content, artid) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target,
      content,
      art_id: artid
    }
  })
}
