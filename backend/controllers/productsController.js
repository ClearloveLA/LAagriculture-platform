const product = require('../models/productsModel')

// product 控制器

// 新增产品 POST
exports.addProduct = async (req, res) => {
  const { farmer_id, description, name, price, stock_quantity, category, image_url } = req.body
  
  try {
    // 调用模型层
    await product.create(farmer_id, description, name, price, stock_quantity, category, image_url)
    res.status(201).json({
      message: '上传成功'
    })
  } catch (err) {
    res.status(500).json({
      message: '服务器内部错误',
      error: err.message
    })
  }
}

// 获取所有产品 GET /products?page=1&pageSize=10&query=水果
exports.getProduct = async (req, res) => {
  // 默认值 没参数的情况下
  let { page = 1, pageSize = 20, query = '' } = req.query

  try {
    // 计算分页的偏移量
    const offset = (page - 1) * pageSize

    // 从数据库中获取符合搜索条件的产品和总数
    const { products, total } = await product.getAll(query, pageSize, offset)

    // 返回商品和总数
    res.status(200).json({
      products,
      total,
      currentPage: Number(page),
      pageSize: Number(pageSize)
    })
  } catch (err) {
    console.log(err)
      res.status(500).json({
        message: '服务器内部错误',
        error: err.message
      })
  }
}

// 获取单个商品 GET /:id
exports.getProductById = async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  console.log(id)
  try {
    // 从数据库中获取id产品
    const productItem = await product.getById(id)
    if (!productItem) {
      return res.status(404).json({
        message: '未找到该产品'
      })
    }
    res.status(200).json(productItem)
  } catch (err) {
      res.status(500).json({
      message: '服务器内部错误',
      error: err.message
    })
  }
}
// 删除商品 DELETE
exports.deleteProduct = async (req, res) => {
  
} 