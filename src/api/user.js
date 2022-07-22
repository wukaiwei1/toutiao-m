import request from '@/utils/request'
// 引入token文件
// import Store from '@/store'

/**
 *
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */
// 登录
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: { mobile, code }
  })
}
// 发送验证码
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的信息

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
  })
}

// 关注用户

export const getConcern = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target
    }
  })
}

// 取消关注用户
export const offConcern = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
