import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建axios示例
const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: 'http://localhost:3000/api',
  timeout: 3000
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 如果有token，将其添加到请求头中
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (respose) => {
    // 响应数据处理
    const res = respose.data
    // 根据接口返回的状态码 判断请求是否成功
    if (res.code >= 200 && res.code < 300) {
      message.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message) || 'Error')
    } else {
      return res
    }
  },
  (error) => {
    // 响应错误处理
    message.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default api
