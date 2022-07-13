import request from '@/utils/request'

/**
 *
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: { mobile, code }
  })
}
