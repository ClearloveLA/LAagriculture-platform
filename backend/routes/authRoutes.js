const express = require('express')

// 引入控制器
const { register, login, refreshToken } = require('../controllers/authController')
const router = express.Router()

// 定义刷新token路由
router.post('/refreshToken', refreshToken)

// 定义注册路由
router.post('/register', register)

// 定义登录路由
router.post('/login', login)

module.exports = router