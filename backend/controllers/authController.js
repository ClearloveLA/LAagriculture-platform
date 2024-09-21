// 引入 User 模型
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config() // 加载 .env 文件中的环境变量

// 工具函数：用于生成两种token
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
  { userId },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
  )
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )
  return { accessToken, refreshToken }
}

// 刷新 Token 控制器
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(401).json({
      message: '没有提供刷新token'
    })
  }

  try {
    // 验证刷新 Token 是否有效  返回一个 Token 中存储的用户数据 (对象)
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    // 如果 Token 有效, 获取解析出的 userId
    const userId = decoded.userId
    // 检查数据库的刷新Token, 确保其合法性
    const user = await User.findById(userId)
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({
        message: '无效的刷新token'
      })
    }
    // 生成新的访问 Token
    const newAccessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    res.status(200).json({
      accessToken: newAccessToken
    })
  } catch(err) {
    // 捕获错误, 例如 Token 已经过期或者无效
    res.status(403).json({
      message: '无效或过期的刷新token'
    })
  }
}


// 注册控制器
exports.register = async (req, res) => {
  const { username, password, email, phone, userType } = req.body

  try {
    // 检查是否为已注册用户
    const existingUserByPhone = await User.findByPhone(phone)
    const existingUserByEmail = await User.findByEmail(email)
    if (existingUserByPhone) {
      return res.status(400).json({
        message: '此手机号已被注册'
      })
    }
    if (existingUserByEmail) {
      return res.status(400).json({
        message: '此邮箱已被注册'
      })
    }
    // 创建新用户
    await User.create(username, password, email, phone, userType)
    res.status(201).json({
      message: '用户注册成功'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: '服务器错误',
      error: err.message
    })
  }
}

// 登录控制器
exports.login = async (req, res) => {
  const { password, phone } = req.body
  try {
    // 检查用户是否存在(根据手机号)
    const user = await User.findByPhone(phone)
    if (!user) {
      return res.status(400).json({
        message: '此用户不存在'
      })
    }
    // 验证密码
    const isValidPassword = bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(400).json({
        message: '密码错误'
      })
    }
    // 生成访问Token和刷新Token
    const { accessToken, refreshToken } = generateTokens(user.userId)
    
    // 将刷新 Token 保存到数据库或返回给客户端
    await User.saveRefreshToken(user.user_id, refreshToken)
    res.status(200).json({
      message: '登录成功',
      accessToken,
      refreshToken
    })
  } catch (err) {
    res.status(500).json({
      message: '服务器错误',
      error:err.message
    })
  }
}