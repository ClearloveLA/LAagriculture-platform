// api.js 存放请求
import api from './axios'

// ------------------------------------------
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

// ------------------------------------------
// 获取所有商品请求
export const getAllProductsReq = async (params) => {
  try {
    const res = await api.get('/products', { params })
    return res
  } catch (error) {
    throw new Error(error.response?.data?.message || '获取商品列表失败')
  }
}

// 获取单个产品请求
export const getProductsItemReq = async (id) => {
  try {
    const res = await api.get(`/products/${id}`)
    return res
  } catch (error) {
    throw new Error(error?.response?.data?.message || '获取商品失败')
  }
}
