// 导入axios
import axios from 'axios'

// 生成一个axios实例对象
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

export default request
