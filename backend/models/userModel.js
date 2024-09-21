const db = require('../config/db')
const bcrypt = require('bcryptjs')

const User = {
  // 创建新用户的方法
  async create(username, password, email, phone, userType) {
    console.log(username, password, email, phone, userType)
    // 使用bcrypt对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 10)

    // 使用 SQL 执行插入操作, 插入新用户到数据库
    const [result] = await db.execute(
      `
        INSERT INTO users (username, email, phone, password_hash, user_type)
        VALUES(?,?,?,?,?)
      `,
      [username, email, phone, hashedPassword, userType]
    )
    // 返回插入操作后的结果
    return result
  },
  async findByPhone(phone) {
    // 查询数据库, 获取对应手机号的用户
    const [rows] = await db.execute('SELECT * FROM users WHERE phone = ?', [phone])
    // 返回查询到的用户信息(数组中的第一条)
    return rows[0]
  },
  async findByEmail(email) {
    // 查询数据库, 获取对应邮箱的用户
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
    // 返回查询到的用户信息(数组中的第一条)
    return rows[0]
  },
  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id])
    // 返回查询到的用户信息(数组中的第一条)
    return rows[0]
  },
  // 将刷新token 保存到数据库的方法
  async saveRefreshToken(userId, refreshToken) {
    await db.execute(
      'UPDATE users SET refresh_token = ? WHERE user_id = ?',
      [refreshToken, userId]
    )
  }
}

// 导出 User模型, 供控制器使用
module.exports = User 