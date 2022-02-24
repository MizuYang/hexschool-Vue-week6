import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Front_Home.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'product_List',
        component: () => import('../views/Front_ProductList.vue')
      },
      {
        path: 'one_product/:id',
        component: () => import('../views/Front_One_Product.vue')
      },
      {
        path: 'product_Cart',
        component: () => import('../views/Front_Cart.vue')
      },
      {
        path: 'form',
        component: () => import('../views/Form.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
