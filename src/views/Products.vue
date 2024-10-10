<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { getAllProductsReq } from '../services/api'
import HeaderBar from '@/components/HeaderBar.vue'
import { useRouter } from 'vue-router'

const products = ref([]) // 存储商品数据
const loading = ref(false) // 加载状态
const searchQuery = ref('') // 搜索关键字
const pageSize = ref(12) // 每页显示的商品数量
const currentPage = ref(1) // 当前页码
const totalProducts = ref(0) // 总商品数量
const accessToken = ref('')

const router = useRouter()

// 获取所有商品的函数
const getAllProducts = async (page = 1, query = '') => {
  loading.value = true
  try {
    const res = await getAllProductsReq({
      page,
      pageSize: pageSize.value,
      query
    })
    console.log(res)
    products.value = res.products // 假设后端返回 products 数组
    totalProducts.value = res.total // 假设后端返回 total 总数
  } catch (error) {
    message.error('加载商品失败，请稍后再试')
  } finally {
    loading.value = false
  }
}

// 搜索商品
const handleSearch = () => {
  currentPage.value = 1
  getAllProducts(1, searchQuery.value) // 重置到第一页并搜索
}

// 分页改变时触发
const handlePageChange = (page) => {
  currentPage.value = page
  getAllProducts(page, searchQuery.value)
}

// 点击商品卡片进入详情页
const goToProductDetail = (productId) => {
  if (accessToken.value) {
    router.push({ name: 'ProductDetail', params: { id: productId } }) // 假设你有商品详情页的路由
  } else {
    message.warn('请先登录')
  }
}

// 页面挂载时，加载商品数据
onMounted(() => {
  accessToken.value = localStorage.getItem('accessToken')
  getAllProducts()
})
</script>

<template>
  <HeaderBar></HeaderBar>
  <div class="all">
    <div class="container">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <a-input-search
          v-model:value="searchQuery"
          placeholder="搜索商品名称或类别"
          enter-button="搜索"
          @search="handleSearch"
        />
      </div>

      <!-- 商品列表 -->
      <a-spin :spinning="loading" class="list">
        <a-row :gutter="16">
          <a-col
            v-for="product in products"
            :key="product.product_id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            style="margin-bottom: 24px"
          >
            <!-- 商品卡片 -->
            <a-card
              :hoverable="true"
              class="product-card"
              @click="goToProductDetail(product.product_id)"
            >
              <template #cover>
                <div class="title">Hot</div>
                <div class="product-image" v-if="1">
                  <img
                    src="../assets/images/bg1.png"
                    alt="product.name"
                    class=""
                  />
                  <div class="icon">
                    <div
                      class="icon-item"
                      v-for="(item, index) in 3"
                      :key="index"
                    ></div>
                  </div>
                </div>
                <div v-else class="image-placeholder">无图片</div>
              </template>
              <a-card-meta
                :title="product.name"
                :description="product.description"
              />
              <div class="product-info">
                <span class="price">价格: ¥{{ product.price }}</span>
                <span class="stock">库存: {{ product.stock_quantity }}</span>
              </div>
            </a-card>
          </a-col>
        </a-row>

        <!-- 分页器 -->
        <a-pagination
          :total="totalProducts"
          :pageSize="pageSize"
          :current="currentPage"
          showSizeChanger
          showQuickJumper
          @change="handlePageChange"
          style="margin-top: 20px; text-align: center"
        />
      </a-spin>
    </div>
  </div>
</template>

<style scoped>
.all {
  background-color: #f5f7ea;
}
.container {
  margin: 0 auto;
  width: 1200px;
  padding: 20px;
  padding-top: 15vh;
  min-height: 100vh;
}

.search-bar {
  margin-bottom: 24px;
  text-align: center;
}

.product-card {
  position: relative;
  height: auto;
  transition: box-shadow 0.3s ease;
  border-radius: 8px;
}

.product-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  margin: 10px auto 0 auto;
  width: 92%;
  overflow: hidden;
  border-radius: 10px;
  height: 260px;
  img {
    height: 100%;
    object-fit: cover;
    transition: all 0.3s;
  }
}

.product-image img:hover {
  transform: scale(1.05);
}


.image-placeholder {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  font-size: 16px;
  color: #999;
}

.product-info {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.price {
  font-size: 13px;
  color: #555;
}

.stock {
  font-size: 13px;
  color: #555;
}

.title {
  z-index: 99;
  font-size: 13px;
  text-align: center;
  color: #fff;
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 5px;
  width: 60px;
  height: 20px;
  background-color: #017d03;
}

.icon {
  opacity: 0;
  top: 87.5px;
  right: -5px;
  position: absolute;
  transition: all 0.5s ease-in-out;
  width: 30px;
  height: 105px;
  .icon-item {
    transition: all 0.5s ease-in-out;
    border-radius: 16px;
    width: 30px;
    height: 30px;
    margin-bottom: 5px;
    background-color: #fff;
  }
}

.product-card:hover {
  .icon {
    opacity: 1;
    transform: translateX(-20px);
  }
  .icon-item:hover {
    background-color: #017d03;
  }
}
</style>
