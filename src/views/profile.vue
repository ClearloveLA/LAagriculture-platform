<script setup>
import { onMounted, ref } from 'vue'
import { getUserInfoReq, updateUserInfoReq } from '@/services/api'
import HeaderBar from '@/components/HeaderBar.vue'
import { message } from 'ant-design-vue'

// 导入图片
import farmerAvatar from '@/assets/images/farmer-avatar.png'
import consumerAvatar from '@/assets/images/consumer-avatar.png'
import farmerIcon from '@/assets/images/farmer.png'
import consumerIcon from '@/assets/images/consumer.png'

// 用户数据
const uid = ref(null)
const userInfo = ref({}) // 当前用户信息
const isModalVisible = ref(false) // 控制弹窗的显示与隐藏
const formRef = ref(null) // 引用表单
const editedUserInfo = ref({}) // 编辑后的用户数据

// 获取用户信息
onMounted(async () => {
  uid.value = localStorage.getItem('uid')
  try {
    const res = await getUserInfoReq(uid.value)
    userInfo.value = res.userInfo
  } catch (error) {
    message.error('获取用户信息失败')
  }
})

// 显示编辑弹窗
const editProfile = () => {
  editedUserInfo.value = { ...userInfo.value } // 复制用户数据到表单
  isModalVisible.value = true
}

// 更新用户信息请求
const fetchUpdateUserInfo = async () => {
  try {
    const res = await updateUserInfoReq(uid.value, { ...editedUserInfo.value }) // 调用更新 API
    return res
  } catch (error) {
    message.error('更新失败，请稍后再试')
    throw error
  }
}

// 处理保存编辑
const handleSave = () => {
  formRef.value
    .validate()
    .then(async () => {
      const res = await fetchUpdateUserInfo() // 调用更新接口
      if (res) {
        userInfo.value = { ...editedUserInfo.value } // 更新成功后刷新页面数据
        message.success('个人信息更新成功')
        isModalVisible.value = false // 关闭弹窗
      }
    })
    .catch(() => {
      message.error('请检查输入内容')
    })
}

// 处理取消编辑
const handleCancel = () => {
  isModalVisible.value = false
}
</script>

<template>
  <div class="all">
    <HeaderBar />
    <div class="profileContainer">
      <nav>
        <button class="editBtn" @click="editProfile">编辑</button>
        <div class="avatar">
          <img
            :src="
              userInfo.user_type === 'farmer' ? farmerAvatar : consumerAvatar
            "
            alt="user type"
          />
        </div>
        <div class="des">
          <div class="username">{{ userInfo.username }}</div>
          <div class="createAt">注册时间: {{ userInfo.created_at }}</div>
          <div class="icon">
            <span>用户类型:</span>
            <img
              :src="userInfo.user_type === 'farmer' ? farmerIcon : consumerIcon"
              alt="user type"
            />
            {{ userInfo.user_type === 'farmer' ? '农民' : '消费者' }}
          </div>
          <div class="signature">
            <span
              >个性签名:
              {{ userInfo.signature || '此人很懒，什么都没有留下。' }}</span
            >
          </div>
        </div>
      </nav>
      <aside>
        <div class="title">个人中心</div>
        <ul>
          <li class="active">我的订单</li>
          <li>我的评论</li>
          <li>我的收藏</li>
          <li>我的喜欢</li>
          <li>我的粉丝</li>
          <li>我的关注</li>
          <li>我的等级</li>
          <li>我的果果币</li>
        </ul>
      </aside>
      <main>
        <div class="title">我的动态</div>
        <div class="post-list">
          <div class="post-card">
            <div class="post-created">
              <img src="../assets/images/time.png" alt="" />
              <span> 2024-10-8 17:23:55</span>
            </div>
            <div class="post-title">
              <span>好吃的苹果推荐</span>
            </div>
            <div class="post-des">
              <span
                >买了这家几种水果，都挺好吃的，尤其是这个苹果，他家的苹果又大又甜，好好吃啊，强烈推荐</span
              >
            </div>
            <div class="post-img">
              <img src="../assets/images/fruit-apple.png" alt="" />
            </div>
            <div class="post-footer">
              <span class="post-label">好物分享</span>
              <span class="review"></span>
              <span class="like"></span>
            </div>
          </div>
        </div>
        <div class="post-list-footer">
          <span>没有更多内容了</span>
        </div>
      </main>
    </div>

    <!-- 编辑个人信息弹窗 -->
    <a-modal
      v-model:open="isModalVisible"
      title="编辑个人信息"
      ok-text="保存"
      cancel-text="取消"
      @ok="handleSave"
      @cancel="handleCancel"
    >
      <a-form
        ref="formRef"
        :model="editedUserInfo"
        :rules="rules"
        layout="vertical"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="editedUserInfo.username"
            placeholder="请输入用户名"
          />
        </a-form-item>

        <a-form-item label="个性签名" name="signature">
          <a-input
            v-model:value="editedUserInfo.signature"
            placeholder="请输入个性签名"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped>
.all {
  background-color: #f0f1f5;
  padding-bottom: 40px;
}
.profileContainer {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 1200px;
  margin: 0 auto;
}
nav,
aside,
main {
  background-color: #fff;
  border-radius: 5px;
}

nav {
  padding: 20px 50px;
  position: relative;
  display: flex;
  margin-bottom: 20px;
  margin-top: 110px;
  height: 200px;
  width: 100%;
  .username {
    font-weight: bold;
    letter-spacing: 1px;
  }
  .editBtn {
    background-color: #fff;
    font-size: 14px;
    right: 50px;
    top: 20px;
    color: #5bc8ff;
    font-weight: bold;
    border-radius: 4px;
    padding: 3px 15px;
    border: 1px solid #5bc8ff;
    position: absolute;
    transition: all 0.3s;
    &:hover {
      color: #fff;
      background-color: #16bbed;
    }
  }
  .avatar {
    img {
      border: 1px solid #ccc;
      margin-top: -5px;
      margin-right: 30px;
      width: 120px;
      height: 120px;
      border-radius: 100px;
    }
  }
  .createAt {
    margin: 5px 0;
    font-size: 12px;
    color: #aaa;
  }
  .icon {
    display: flex;
    margin: 5px 0;
    font-size: 14px;
    span {
      margin-right: 25px;
    }
    img {
      position: absolute;
      left: 265px;
      margin-right: 6px;
      height: 20px;
      width: 20px;
    }
  }

  .signature {
    margin-top: 20px;
    font-size: 14px;
  }
}

aside {
  width: 25%;
  margin-right: 2%;
  max-height: 80vh;
  ul {
    font-size: 15px;
    padding: 8px 0px 8px 30px;
    li {
      padding: 12px 3px;
      &.active {
        color: #16bbed;
      }
    }
  }
}

main {
  position: relative;
  width: 73%;
  min-height: 80vh;
  .post-list {
    padding: 10px;
    padding-left: 20px;
    .post-card:nth-last-child(1) {
      margin-bottom: 100px;
    }
    .post-card {
      margin-bottom: 20px;
    }
    .post-created {
      margin: 5px 0;
      font-size: 13px;
      color: #aaa;
      img {
        position: absolute;
        width: 16px;
      }
      span {
        margin-left: 22px;
      }
    }
    .post-title {
      font-size: 18px;
      margin: 5px 0 8px 0;
      font-weight: bold;
    }
    .post-des {
      font-size: 15px;
      color: #aaa;
      margin-bottom: 5px;
    }
    .post-img {
      height: 180px;
      width: 300px;
      margin-bottom: 10px;
      img {
        border-right: 5px;
        height: 180px;
        width: 100%;
        object-fit: cover;
      }
    }
    .post-label {
      padding: 4px 8px;
      color: #333;
      border-radius: 10px;
      font-size: 13px;
      background-color: #eee;
    }
  }
  .post-list-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    margin-top: 10px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #aaa;
    border-top: 1px solid #ddd;
  }
}

.title {
  padding: 10px;
  padding-left: 20px;
  color: #333;
  width: 100%;
  height: 45px;
  line-height: 25px;
  border-bottom: 1px solid #e3e3e3;
  font-size: 16px;
}
</style>
