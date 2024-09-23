const express = require('express')

// 引入控制器
const { getProduct, getProductById } = require('../controllers/productsController')
const router = express.Router()

// 定义获取全部产品路由
router.get('/', getProduct)
// 获取单个产品路由
router.get('/:id', getProductById)

module.exports = router