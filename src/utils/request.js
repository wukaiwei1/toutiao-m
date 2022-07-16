// 导入axios
import axios from 'axios'
// 导入token文件
import Store from '@/store'
// 生成一个axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = Store.state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)
export default request
