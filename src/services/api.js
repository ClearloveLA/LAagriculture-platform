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

// 删除商品请求 (farmer)
export const delProductItemReq = async (id) => {
  try {
    const res = await api.del(`/products/${id}`)
    return res
  } catch (error) {
    throw new Error(error?.response?.data?.message || '删除商品失败')
  }
}

// 更新商品请求 (farmer)
export const updateProductItemReq = async (item) => {
  try {
    const res = await api.post('products', item)
    return res
  } catch (error) {
    throw new Error(error?.response?.data?.message || '更新商品失败')
  }
}

// ------------------------------------------
// 获取个人信息请求
export const getUserInfoReq = async (id) => {
  try {
    const res = await api.get('/user', {
      params: {
        id
      }
    })
    return res
  } catch (error) {
    throw new Error(error?.response?.data?.message || '获取个人资料失败')
  }
}

// 更新个人信息请求
export const updateUserInfoReq = async (id, userInfo) => {
  try {
    // 使用 PUT 请求更新用户信息，并传递用户 ID
    const res = await api.put(`/user/${id}`, userInfo)
    return res
  } catch (error) {
    throw new Error(error?.response?.data?.message || '更新个人信息失败')
  }
}
