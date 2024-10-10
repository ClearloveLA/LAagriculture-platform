import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Profile from '../views/profile.vue'
import Forum from '../views/forum.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/productDetail/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/forum',
      name: 'forum',
      component: Forum
    }
  ]
})

export default router
