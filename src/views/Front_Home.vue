<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">六角早午餐</a>
      <router-link
        class="navbar-toggler"
        to="/"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="nav-link active">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/product_List" class="nav-link"
              >前台產品列表</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <router-link to="/product_Cart" class="nav-link"
              >前台購物車</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">後台</router-link>
          </li>
        </ul>
        <div class="me-2">
          <router-link to="/login" class="btn btn-success">登入</router-link>
        </div>
        <div class="me-3">
          <router-link
            to="/product_Cart"
            type="button"
            class="btn btn-primary position-relative"
          >
            購物車
            <span
              class="
                position-absolute
                top-0
                start-100
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
            >
              {{ cartList.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import emitter from '@/utils/emitter.js'

export default {
  data () {
    return {
      cartList: []
    }
  },
  methods: {
    // * 取得購物車清單
    getCart () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then((res) => {
          this.cartList = res.data.data.carts
          this.product_total = res.data.data.final_total
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
    emitter.on('remove_cart_product', () => {
      this.getCart()
    })
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
