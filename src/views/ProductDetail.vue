<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductsItemReq } from '../services/api'
import { message } from 'ant-design-vue'
import HeaderBar from '@/components/HeaderBar.vue'

const router = useRouter()
const route = useRoute()
const product = ref(null)
const loading = ref(true)

// 获取商品详情
const fetchProductDetail = async (id) => {
  loading.value = true
  try {
    const res = await getProductsItemReq(id)
    product.value = res[0]
  } catch (error) {
    message.error('加载商品详情失败')
  } finally {
    loading.value = false
  }
}

// 页面加载时获取商品详情
onMounted(() => {
  const productId = route.params.id
  fetchProductDetail(productId)
})

// 返回上页的方法
const goBack = () => {
  router.push('/Products')
}
</script>
<template>
  <HeaderBar></HeaderBar>
  <div class="product-detail-container">
    <a-spin :spinning="loading">
      <a-card v-if="product" class="product-detail-card">
        <a-row :gutter="24">
          <!-- 左侧的图片部分 -->
          <a-col :span="10">
            <img
              v-if="product.image_url"
              src="../assets/images/banner.png"
              alt="product.name"
              class="product-image"
            />
            <div v-else class="image-placeholder">无图片</div>
          </a-col>

          <!-- 右侧的详情信息部分 -->
          <span class="goBack" @click="goBack"> 返回上页 </span>
          <a-col :span="14">
            <div class="product-details">
              <h2>{{ product.name }}</h2>
              <p class="description">{{ product.description }}</p>

              <div class="product-info">
                <span class="price">¥{{ product.price }}</span>
                <span class="stock">库存: {{ product.stock_quantity }}</span>
                <span class="category">类别: {{ product.category }}</span>
              </div>

              <a-button type="primary" size="large" class="buy-button" block>
                立即购买
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-card>
    </a-spin>
  </div>
</template>

<style scoped>
.goBack {
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  padding: 10px;
  top: 0;
  right: 10px;
  font-weight: bold;
}
.product-detail-container {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  padding-top: 15vh;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.product-detail-card {
  margin: 0 auto;
  width: 60%;
  background-color: #fff;
  border-radius: 12px;
}

.product-image {
  width: 100%;
  height: 340px;
  border-radius: 12px;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e9e9e9;
  font-size: 16px;
  color: #999;
  border-radius: 12px;
}

.product-details {
  padding: 20px;
}

h2 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.description {
  font-size: 16px;
  color: #666;
  margin-top: 12px;
}

.product-info {
  margin: 24px 0;
  display: flex;
  flex-direction: column;
}

.price {
  font-size: 28px;
  font-weight: bold;
  color: #f5222d;
}

.stock {
  font-size: 16px;
  color: #555;
  margin-top: 8px;
}

.category {
  font-size: 16px;
  color: #555;
  margin-top: 8px;
}

.buy-button {
  margin-top: 24px;
  background-color: #1890ff;
  border-radius: 8px;
  font-size: 18px;
  height: 48px;
}
</style>
