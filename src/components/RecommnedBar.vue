<script setup>
import { ref, onMounted } from 'vue'
import recipesData from '../assets/staticDB/recipes.json'

const recipes = ref([])

onMounted(() => {
  recipes.value = recipesData
  console.log(recipes.value)
})
</script>

<template>
  <div class="show">
    <div v-for="(recipe, index) in recipes" :key="index" class="showBox">
      <img src="../assets/images/banner.png" :alt="recipe.title" />
      <div class="mask">
        <a href="#">
          {{ recipe.title }}
          <!-- 这里不再使用 v-for 循环 -->
          <p>
            {{ recipe.description }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*页眉水平移动*/
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-30%);
  }
  50% {
    transform: translateX(0%);
  }
  75% {
    transform: translateX(30%);
  }
  100% {
    transform: translateX(0%);
  }
}

.show {
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  margin: 100px auto -150px auto;
}

.showBox {
  margin: 10px;
  margin-top: 10vh;
  animation: scroll-left 10s linear infinite;
}

.showBox {
  position: relative; /* 为遮罩层定位提供参考 */
  width: 150px; /* 初始宽度 */
  height: 100px; /* 初始高度 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
  transform-origin: bottom; /* 变形原点设在底部 */
}

.showBox:hover {
  width: 250px; /* 悬停时的宽度 */
  height: 250px; /* 悬停时的高度 */
  margin-top: -100px; /* 使用 margin-top 调整位置 */
  animation-play-state: running; /* 保持动画继续 */
  img {
    height: 170px;
  }
}

.showBox img {
  cursor: pointer;
  border: 1px solid #afafaf;
  width: 100%;
  height: 100px;
  object-fit: cover; /* 图片覆盖整个可见区域，避免被拉伸或压缩 */
  transition: all 0.3s;
  -webkit-box-reflect: below 2px
    linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.6));
}

.showBox a {
  color: rgb(255, 255, 255);
  display: block;
  text-align: center;
  font-weight: bold;
  padding-top: 10px;
  /* margin-top: 70px; */
  p {
    font-family: '楷体';
    padding: 1px 2px;
    color: #fff;
    font-weight: normal;
    margin: 5px;
    flex-direction: row;
    font-size: 12px;
    text-align: left;
  }
  p:nth-child(1) {
    margin-top: 8px;
  }
}

.mask {
  position: absolute; /* 让遮罩层覆盖图片 */
  display: flex;
  margin-bottom: 80px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明黑色遮罩层 */
  opacity: 0; /* 默认透明，不显示 */
  transition: opacity 0.3s ease; /* 平滑过渡效果 */
  z-index: 2; /* 确保遮罩层在内容上方 */
}

.showBox:hover .mask {
  opacity: 1; /* 悬停时显示遮罩层 */
}
</style>
