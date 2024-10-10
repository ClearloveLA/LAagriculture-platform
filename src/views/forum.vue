<script setup>
import { onMounted, ref } from 'vue'
import { getUserInfoReq } from '@/services/api'
import { message } from 'ant-design-vue'
import WhoToFollow from '@/components/WhoToFollow.vue'
const uid = ref(null)
const userInfo = ref({})

// 获取用户信息
onMounted(async () => {
  console.log(uid.value)
  uid.value = localStorage.getItem('uid')
  try {
    const res = await getUserInfoReq(uid.value)
    userInfo.value = res.userInfo
    console.log(userInfo.value)
  } catch (error) {
    message.error('获取用户信息失败')
  }
})
import HeaderBar from '@/components/HeaderBar.vue'
</script>
<template>
  <div class="all">
    <HeaderBar></HeaderBar>
    <div class="forum-container">
      <nav>
        <div class="icon-info"></div>
        <div class="search-box"></div>
      </nav>
      <aside>
        <div class="avatar">
          <img src="../assets/images/consumer-avatar.png" alt="" />
        </div>
        <div class="username">
          <span>{{ userInfo.username }}</span>
        </div>
        <div class="usertype">
          <img src="../assets/images/consumer.png" alt="" />
          <span>博主类型: {{ userInfo.user_type }}</span>
        </div>
        <div class="signature">
          <span>{{ userInfo.signature }}</span>
        </div>
        <!-- 用户关注相关数量盒子 -->
        <div class="number">
          <div class="num-box">
            <span>200</span>
            <em>Post</em>
          </div>
          <div class="num-box">
            <span>2.5K</span>
            <em>Followers</em>
          </div>
          <div class="num-box">
            <span>365</span>
            <em>Following</em>
          </div>
        </div>
        <!-- 相关操作选项 -->
        <ul class="options">
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Feed</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Connections</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Latest News</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Events</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Groups</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>Notifications</span>
            </div>
          </li>
          <li>
            <div class="options-icon">
              <img src="../assets/images/consumer.png" alt="" />
              <span>settings</span>
            </div>
          </li>
        </ul>
        <div class="goToProfile">
          <span>View Profile</span>
        </div>
      </aside>
      <main>
        <div class="show">
          <div class="show-card post-card">
            <div class="add">
              <span>+</span>
            </div>
            <span class="des">Post a Story</span>
          </div>
          <div class="show-card">
            <div class="mask">
              <div class="text">Judy Nguyen</div>
            </div>
            <img src="../assets/images/consumer-avatar.png" alt="" />
          </div>
          <div class="show-card">
            <div class="mask">
              <div class="text">Judy Nguyen</div>
            </div>
            <img src="../assets/images/consumer-avatar.png" alt="" />
          </div>
          <div class="show-card">
            <div class="mask">
              <div class="text">Judy Nguyen</div>
            </div>
            <img src="../assets/images/consumer-avatar.png" alt="" />
          </div>
          <div class="show-card">
            <div class="mask">
              <div class="text">Judy Nguyen</div>
            </div>
            <img src="../assets/images/consumer-avatar.png" alt="" />
          </div>
        </div>
        <div class="toPost">
          <div class="text">
            <div class="avatar">
              <img src="../assets/images/consumer-avatar.png" alt="" />
            </div>
            <span>Share your thoughts...</span>
          </div>
          <div class="label-box">
            <div class="post-label">
              <img src="../assets/images/farmer.png" alt="" />
              <span>Photo</span>
            </div>
            <div class="post-label">
              <img src="../assets/images/farmer.png" alt="" />
              <span>Photo</span>
            </div>
            <div class="post-label">
              <img src="../assets/images/farmer.png" alt="" />
              <span>Photo</span>
            </div>
            <div class="post-label">
              <img src="../assets/images/farmer.png" alt="" />
              <span>Photo</span>
            </div>
            <div class="more">...</div>
          </div>
        </div>
        <div class="post-list">
          <div class="post-card">
            <div class="post-head">
              <div class="avatar">
                <img src="../assets/images/consumer-avatar.png" alt="" />
              </div>
              <div class="post-user">
                <div class="username">
                  {{ userInfo.username }}
                  <span>·</span>
                  <span>2h</span>
                </div>
                <div class="signature">博主签名：{{ userInfo.signature }}</div>
              </div>
              <div class="more">
                <span>...</span>
              </div>
            </div>
            <div class="post-content">
              <div class="text">
                <span>
                  I'm thrilled to share that l've completed a graduate
                  certificate course inproject management with the president's
                  honor roll.
                </span>
              </div>
              <div class="image">
                <img src="../assets/images/fruit-apple.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div class="right">
        <WhoToFollow></WhoToFollow>
        <div class="hot-posts"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.all {
  background-color: #eff2f6;
  padding-bottom: 40px;
}
.forum-container {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  width: 1200px;
  margin: 0 auto;
}

nav,
aside,
main,
.right {
  border-radius: 3px;
  background-color: #ffffff;
}

nav {
  margin-top: 110px;
  margin-bottom: 15px;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  /* color: #2e82ee; */
  display: flex;
}

aside::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 50px;
  background-image: url('../assets/images/bg1.png');
}
aside {
  margin-right: 10px;
  position: relative;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 600px;
  padding: 0px;
  .avatar {
    z-index: 111;
    margin-top: 30px;
    width: 100%;
    border-radius: 4px;
    width: 70px;
    height: 70px;
    border: 2px solid #737373;
    img {
      width: 66px;
      height: 100%;
      object-fit: cover;
    }
  }
  .username {
    margin-top: 5px;
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
  .usertype {
    margin-top: 5px;
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #aaa;
    img {
      width: 16px;
    }
  }
  .signature {
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
  }
  .number {
    text-align: center;
    margin-top: 10px;
    display: flex;
    .num-box {
      padding-bottom: 8px;
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-wrap: wrap;
      span {
        width: 100%;
        font-weight: bold;
      }
      em {
        margin-top: 3px;
        color: #999;
        width: 100%;
        display: inline-block;
        text-align: center;
        font-style: normal;
        font-size: 13px;
      }
    }
  }
  .options {
    margin-top: 15px;
    li {
      letter-spacing: 1px;
      font-weight: bold;
      padding: 9px 0;
      padding-right: 88px;
    }
    img {
      margin-right: 10px;
      width: 16px;
    }
  }
  .goToProfile {
    margin-top: 20px;
    font-weight: 900;
    letter-spacing: 0.4px;
    font-size: 15px;
    width: 100%;
    text-align: center;
    padding: 12px 0;
    border-top: 1px solid #e7f0fd;
    color: #4292fb;
  }
}

main {
  overflow: hidden;
  margin: 0 5px;
  width: 600px;
  background-color: #eff2f6;
  .show {
    display: flex;
    width: 600px;
    height: 150px;
    .show-card {
      margin-left: 12px;
      position: relative;
      background-color: #fff;
      width: 110px;
      height: 100%;
      img {
        border-radius: 5px;
        width: 110px;
        height: 100%;
        object-fit: cover;
      }
      .mask {
        border-radius: 5px;
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        height: 100%;
        z-index: 2;
        background: linear-gradient(to bottom, #ffffff20, #000000d2);
        .text {
          letter-spacing: 0.2px;
          font-size: 14px;
          position: absolute;
          left: 5px;
          bottom: 10px;
          color: #fff;
        }
      }
    }
    .post-card {
      margin-left: 0;
      padding: 30px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;
      border: 2px dashed #ddd;
      .add {
        display: flex;
        justify-content: center;
        width: 100%;
        span {
          font-size: 20px;
          font-weight: bold;
          display: block;
          color: #666;
          border-radius: 20px;
          line-height: 36px;
          width: 40px;
          height: 40px;
          background-color: #eef0f2;
        }
      }
      .des {
        letter-spacing: 0.4px;
        width: 100%;
      }
    }
  }
  .toPost {
    position: relative;
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 150px;
    background-color: #fff;
    .text {
      color: #999;
      display: flex;
      height: 40px;
      align-items: center;
      .avatar {
        img {
          margin-right: 25px;
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
      }
    }
    .label-box {
      display: flex;
      bottom: 15px;
      position: absolute;
      .post-label {
        margin-right: 6px;
        display: flex;
        border-radius: 8px;
        background-color: #eee;
        color: #555;
        font-size: 12px;
        padding: 2px 6px;
        img {
          margin-right: 5px;
          width: 15px;
        }
      }
      .more {
        border-radius: 3px;
        margin-left: 275px;
        color: #777;
        line-height: 12px;
        text-align: center;
        width: 20px;
        height: 20px;
        background-color: #ddd;
      }
    }
  }
  .post-list {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .post-card {
      position: relative;
      background-color: #fff;
      padding: 10px 15px;
      .post-head {
        display: flex;
        width: 100%;
        .avatar {
          img {
            width: 40px;
          }
        }
        .post-user {
          letter-spacing: 0.5px;
          margin-left: 10px;
          .username {
            font-weight: bold;
            span {
              font-size: 14px;
              color: #aaa;
              margin-left: 5px;
            }
          }
          .signature {
            line-height: 22px;
            font-size: 13px;
            color: #555;
          }
        }
        .more {
          position: absolute;
          right: 14px;
        }
      }
      .post-content {
        margin-top: 15px;
        width: 100%;
        .text {
          font-size: 15px;
          color: #555;
        }
        .image {
          padding-bottom: 20px;
          margin-top: 15px;
          img {
            border-radius: 10px;
            object-fit: cover;
            width: 100%;
            height: 300px;
          }
        }
      }
    }
  }
}

.right {
  background-color: #eff2f6;
  margin-left: 10px;
  width: 250px;
}
</style>
