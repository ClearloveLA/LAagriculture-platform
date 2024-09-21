const express = require('express')
// 引入控制器
const { register, login } = require('../crotrollers/authController')
const router = express.Router()

// 定义注册路由
router.post('/register', register)

// 定义登录路由
router.post('/login', login)

module.exports = router