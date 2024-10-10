<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const accessToken = localStorage.getItem('accessToken')
const router = useRouter()

// 导航项数据
const navItems = ref([
  { name: '主页', path: '/', icon: '/src/assets/images/small-logo.png' },
  {
    name: '农产品',
    path: '/products',
    icon: '/src/assets/images/small-logo.png'
  },
  { name: '社区', path: '/forum', icon: '/src/assets/images/small-logo.png' },
  { name: '直播', path: '/', icon: '/src/assets/images/small-logo.png' }
])

// 跳转到个人中心的各个页面
const navigateTo = (path) => {
  router.push(path)
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('accessToken')
  message.success('成功退出登录')
  router.push('/auth') // 跳转到登录页面
}
</script>

<template>
  <header>
    <div class="nav-header">
      <p class="navbar-brand font-special">农业互联，尽在李昂</p>
      <p class="navbar-brandE font-special">您的身份：消费者</p>
    </div>
    <ul>
      <li
        v-for="(item, index) in navItems"
        :key="index"
        :class="{ active: $route.path === item.path }"
      >
        <router-link :to="item.path">
          {{ item.name }}
          <img :src="item.icon" alt="" />
        </router-link>
      </li>

      <!-- 如果用户已登录显示个人中心下拉菜单 -->
      <li v-if="accessToken">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            个人中心 <img src="/src/assets/images/small-logo.png" alt="" />
          </a>
          <!-- 下拉菜单 -->
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile" @click="navigateTo('/profile')">
                个人资料
              </a-menu-item>
              <a-menu-item key="orders" @click="navigateTo('/orders')">
                我的订单
              </a-menu-item>
              <a-menu-item key="reviews" @click="navigateTo('/reviews')">
                我的评价
              </a-menu-item>
              <a-menu-item key="reviews" @click="navigateTo('/reviews')">
                我的购物车
              </a-menu-item>
              <a-menu-item key="logout" @click="handleLogout">
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </li>

      <!-- 如果未登录显示去登录 -->
      <li v-else>
        <router-link to="/auth">去登录</router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  width: 100%;
  z-index: 9999999;
  padding: 10px 30px 10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  overflow: hidden;
  border-bottom: double #fff 2px; /*  双白线  */
  background-color: rgba(0, 0, 0, 0.55);
  transition: top 0.3s;
}

.nav-header {
  display: flex;
  flex-direction: column;
}

.navbar-brand {
  padding-top: 5px !important;
  letter-spacing: 2px;
  font-weight: bold;
}

.navbar-brandE {
  padding-top: 10px !important;
  font-size: 16px !important;
  font-weight: 700;
  text-align: center;
}

.font-special {
  padding: 0;
  font-size: 22px;
}

header ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

header ul li {
  text-align: center;
  font-weight: normal;
  transition: all 0.5s linear;
  padding: 5px 15px;
  border-radius: 20px;
}

header ul li img {
  width: 30px;
}

header ul li:hover {
  background-color: rgba(57, 225, 222, 0.588);
  color: #2b1055;
}

header ul li .active {
  background-color: rgb(73, 114, 75);
  color: #2b1055;
}

a:link,
a:visited {
  color: #fff;
  text-decoration: none;
}
</style>
