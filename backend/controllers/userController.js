// 引入 User 模型
const User = require('../models/userModel')

// 获取userInfo控制器
exports.getUserInfo = async (req, res) => {
  const id = req.query.id
  try {
    // 调用模型层
    const userInfo = await User.getUserInfo(id)
    res.status(200).json({
      userInfo: userInfo
    })
  } catch (err) {
    console.log(err)
      res.status(500).json({
      message: '服务器内部错误',
      error: err.message
    })
  }
}