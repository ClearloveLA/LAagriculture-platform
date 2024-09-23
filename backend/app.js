const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

// 中间件
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

// 路由
app.get('/', (req, res) => {
  res.send('success')
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
