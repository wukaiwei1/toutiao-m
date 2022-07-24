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

// 获取用户个人资料
export const getuserMessage = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

// 编辑个人资料

export const setUserMessage = (userinfo) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      ...userinfo
    }
  })
}

// 编辑用户头像
export const getuserPic = (photo) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: photo
  })
}
