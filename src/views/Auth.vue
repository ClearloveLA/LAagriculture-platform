<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { registerReq, loginReq } from '../services/api'

const loginFormRef = ref(null)
const LoginFormData = ref({
  username: '',
  phone: '',
  password: ''
})

const regFormRef = ref(null)
const regFormData = ref({
  username: '',
  password: '',
  email: '',
  phone: '',
  userType: ''
})

const boxFlag = ref(true)
const toggleBoxFlag = () => {
  boxFlag.value = !boxFlag.value
}

// 登录表单校验规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 16, message: '用户名最多为16个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/, // 自定义手机号正则表达式
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少需要6个字符', trigger: 'blur' }
  ]
}

// 注册表单校验规则
const regRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 16, message: '用户名最多为16个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少需要6个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/, // 自定义手机号正则表达式
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  userType: [{ required: true, message: '请选择身份', trigger: 'blur' }]
}

// 处理提交按钮的方法
const handleSubmit = async () => {
  try {
    // 检验状态
    if (boxFlag.value == true) {
      // 登录逻辑
      await loginFormRef.value.validate()
      const res = await loginReq(LoginFormData.value)
      message.success('登录成功')
      console.log(res)
    }
    if (boxFlag.value == false) {
      // 注册逻辑
      await regFormRef.value.validate()
      const res = await registerReq(regFormData.value)
      message.success('注册成功')
      console.log(res)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="auth">
    <div class="auth-box">
      <div class="reg" :class="{ active: !boxFlag }">
        <!-- 切换到注册状态的按钮 -->
        <a-form-item v-if="boxFlag" :wrapper-col="{ offset: 4, span: 16 }">
          <button class="goTo" @click="toggleBoxFlag()">去注册</button>
        </a-form-item>
        <div v-if="!boxFlag">
          <h1>注册</h1>
          <a-form
            class="form"
            :model="regFormData"
            :rules="regRules"
            ref="regFormRef"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-form-item name="username">
              <a-input
                v-model:value="regFormData.username"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item name="password">
              <a-input
                v-model:value="regFormData.password"
                type="password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item name="email">
              <a-input
                v-model:value="regFormData.email"
                placeholder="请输入邮箱"
              />
            </a-form-item>
            <a-form-item name="phone">
              <a-input
                v-model:value="regFormData.phone"
                type="tel"
                placeholder="请输入手机号"
              />
            </a-form-item>

            <!-- 用户类型 -->
            <a-form-item name="userType">
              <a-select
                v-model:value="regFormData.userType"
                placeholder="请选择用户类型"
              >
                <a-select-option value="farmer">农民</a-select-option>
                <a-select-option value="consumer">消费者</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
              <button @click="handleSubmit">注册</button>
            </a-form-item>
          </a-form>
        </div>
      </div>

      <div class="login" :class="{ active: boxFlag }">
        <!-- 切换到登录状态的按钮 -->
        <a-form-item v-if="!boxFlag" :wrapper-col="{ offset: 4, span: 16 }">
          <button class="goTo" @click="toggleBoxFlag()">去登录</button>
        </a-form-item>
        <div v-if="boxFlag">
          <h1>登录</h1>
          <a-form
            class="form"
            :model="LoginFormData"
            :rules="loginRules"
            ref="loginFormRef"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 24 }"
          >
            <a-form-item name="username">
              <a-input
                v-model:value="LoginFormData.username"
                placeholder="请输入用户名"
              />
            </a-form-item>
            <a-form-item name="phone">
              <a-input
                v-model:value="LoginFormData.phone"
                placeholder="请输入手机号"
              />
            </a-form-item>
            <a-form-item name="password">
              <a-input
                v-model:value="LoginFormData.password"
                type="password"
                placeholder="请输入密码"
              />
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
              <button @click="handleSubmit">登录</button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/images/bg1.png');
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
}

.auth-box {
  overflow: hidden;
  border-radius: 15px;
  transform: translateX(23vw) translateY(18vh);
  position: absolute;
  width: 56vw;
  height: 62vh;
  display: flex;
  box-shadow: 3px 3px 15px #7e886f;
}

.reg,
.login {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../assets/images/bg1.png');
  background-color: #e9e9e9;
  width: 50%;
  padding: 10px 70px;
}

.active {
  background-image: none;
  h1 {
    text-align: center;
    font-weight: normal;
    font-size: 24px;
    padding: 50px 0 30px 0;
  }
}

button {
  font-size: 15px;
  letter-spacing: 2px;
  color: #fff;
  width: 100%;
  margin-top: 15px;
  padding: 8px;
  border: 0;
  border-radius: 18px;
  background: linear-gradient(to right, #608c52, #c3d8ab);
}

.goTo {
  font-weight: bold;
  margin-top: 115%;
}
</style>
