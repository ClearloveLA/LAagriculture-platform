// api.js 存放请求
import api from './axios'

// 注册请求
export const registerReq = async (regFormData) => {
  try {
    const res = await api.post('/auth/register', regFormData)
    return res
  } catch (error) {
    throw new Error(error.response?.data?.message || '注册失败')
  }
}

// 登录请求
export const loginReq = async (loginFormData) => {
  try {
    const res = await api.post('/auth/login', loginFormData)
    return res
  } catch (error) {
    throw new Error(error.response?.data?.message || '登陆失败')
  }
}
