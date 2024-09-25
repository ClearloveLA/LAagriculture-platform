const express = require('express')

// 引入控制器
const { getUserInfo } = require('../controllers/userController')
const router = express.Router()


// 定义获取个人信息路由
router.get('/', getUserInfo )

module.exports = router