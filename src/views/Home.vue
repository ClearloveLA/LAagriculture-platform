<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
</script>

<template>
  <div>
    <HeaderBar></HeaderBar>
    <div class="banner">
      <img src="../assets/images/banner.png" alt="" />
      <div class="des">
        <span>欢迎来到</span>
        <h1>李昂大哥哥庄园</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
.banner {
  img {
    position: relative;
    opacity: 0.88;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}
.des {
  color: #fff;
  bottom: 0;
  right: 0;
  position: absolute;
  font-size: 60px;
  color: transparent;
  text-shadow:
    0 0 5px #10aaec,
    1px 1px 1px #fff,
    -1px -1px 1px #236f79,
    0 0 10px #99f6ff,
    0 0 20px #50adeb;
  h1 {
  }
}
</style>
