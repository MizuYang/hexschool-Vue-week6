<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">六角早午餐</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
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
    <div class="display-1">後台</div>
  </div>
</template>
