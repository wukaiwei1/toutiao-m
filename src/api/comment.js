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
