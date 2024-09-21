<script setup>
import { ref } from 'vue'

// 导航项数据
const navItems = ref([
  { name: '主页', path: '/', icon: '/src/assets/images/small-logo.png' },
  { name: '农产品', path: '/', icon: '/src/assets/images/small-logo.png' },
  { name: '社区', path: '/', icon: '/src/assets/images/small-logo.png' },
  {
    name: '直播',
    path: '/',
    icon: '/src/assets/images/small-logo.png'
  },
  {
    name: '个人中心',
    path: '/auth',
    icon: '/src/assets/images/small-logo.png'
  }
])
</script>

<template>
  <header>
    <div class="nav-header">
      <p class="navbar-brand font-special">农业互联，尽在李昂</p>
      <p class="navbar-brandE font-special">customer</p>
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
    </ul>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 99;
  padding: 10px 30px 10px 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  overflow: hidden;
  border-bottom: double #fff 1px; /*  双白线  */
  background-color: rgba(0, 0, 0, 0.5);
  transition: top 0.3s; /* 添加过渡效果 */
}

.nav-header {
  display: flex;
  flex-direction: column;
}

.nav-brand {
  font-weight: bold;
}

.navbar-brandE {
  font-size: 15px;
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
  background-color: #497271;
  color: #2b1055;
}

header ul li .active {
  background-color: #497271;
  color: #2b1055;
}

a:link,
a:visited {
  color: #fff;
  text-decoration: none;
}
</style>
