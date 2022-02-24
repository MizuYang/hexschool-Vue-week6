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
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row justify-content-center">
      <div class="d-flex justify-content-between  my-5">
        <h1 class="h3 font-weight-normal">請先登入</h1>
        <router-link to="/product_List" class="btn btn-secondary">返回</router-link>
      </div>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              v-model="user.username"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 登入帳號
      this.$http
        .post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message)
          // 抓出 token 和 唯一值
          const { token, expired } = res.data
          // 存入 cookie
          document.cookie = `mizuToken=${token};expires=${new Date(expired)};`
          this.$router.push('/admin')
        })
        .catch((err) => {
          alert(err.data.message)
          this.user.username = ''
          this.user.password = ''
        })
    }
  }
}
</script>
