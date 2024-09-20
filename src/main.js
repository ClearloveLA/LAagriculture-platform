import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles/base.css'

import App from './App.vue'
import router from './router'
// 引入 Ant Design Vue 组件库
import Antd from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
