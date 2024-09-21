const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const app = express()
 
// 中间件
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

// 路由
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
  res.send('success')
})
// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
