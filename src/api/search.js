import request from '@/utils/request'

// 搜索建议
export const getSearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}

// 搜索结果
export const getSearchResults = (q, page = 1, per_Page = 10) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_Page
    }
  })
}
