<template>
  <div class="container text-center">
    <h2>單一產品細節</h2>
    <template v-if="product.category" class="mx-auto">
      <div class="card mb-3">
        <div>
          <img
            :src="product.imageUrl"
            class="card-img-top primary-image img-fluid"
            style="width: 200px; height: 200px; object-fit: cover"
            alt="主圖"
          />
        </div>
        <div class="card-body">
          <h3 class="card-title">
            {{ product.title }}
            <span class="badge bg-primary ms-2">{{ product.category }}</span>
          </h3>
          <p>   <span class="fs-4">商品描述：</span>     <br>{{ product.description }}</p>
          <p>   <span class="fs-4">商品內容：</span>     <br>{{ product.content }}</p>
          <div class="d-flex justify-content-center">
            <p class="card-text me-2">{{ product.price }}</p>
            <p class="card-text text-secondary">
              <del>{{ product.origin_price }}</del>
            </p>
            {{ product.unit }} / 元
          </div>
          <div>
            <button type="button" class="btn btn-secondary" @click="$router.back">返回</button>
          </div>
        </div>
      </div>
      <template v-for="(img, i) in product.imagesUrl" :key="i">
        <img :src="img" alt="" class="images m-2 img-fluid" />
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    //* 取得單一產品
    get_product () {
      const id = this.$route.params.id
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
      this.$http
        .get(url)
        .then((res) => {
          this.product = res.data.product
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.get_product()
  }
}
</script>
