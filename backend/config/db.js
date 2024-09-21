const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()
const db = mysql.createPool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,  // 等待连接可用
  connectionLimit: 10,       // 设置最大连接数，适当调整
  queueLimit: 0              // 队列请求的数量限制，0表示不限制
});



module.exports = db.promise()