const db = require('../config/db')

// 构造产品模型
const product = {
  // 创建新产品的方法
  async create (farmer_id, description, name, price, stock_quantity, category, image_url) {
    const [result] = await db.execute(`
      INSERT INTO products 
      (farmer_id, name, description, price, stock_quantity, category, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    [farmer_id, description, name, price, stock_quantity, category, image_url])
    return result
  },
  // 获取全部商品信息的方法
  async getAll(query, limit, offset) {
    const searchQuery = `%${query}%`
    

    // 获取符合条件的产品列表
    // 使用字符串拼接代替参数传递
    const queryStr = `SELECT * FROM products WHERE name LIKE ? OR category LIKE ? LIMIT ${limit} OFFSET ${offset}`
    const [products] = await db.execute(queryStr, [searchQuery, searchQuery])
    
    // 获取符合条件的产品总数
    const countQuery = `SELECT COUNT(*) AS total FROM products WHERE name LIKE ? OR category LIKE ?`
    const [total] = await db.execute(countQuery, [searchQuery, searchQuery])
    return {
      products, total: total[0].total
    }
  },
  // 获取单个商品信息的方法
  async getById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE product_id = ?', [id])
    return rows  
  }
}

module.exports = product