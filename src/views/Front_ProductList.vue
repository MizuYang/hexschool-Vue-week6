<template>
  <div class="container">
    <div class="text-center my-3">
      <h2>前台產品列表</h2>
    </div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100" style="width: 19rem">
          <img
            :src="product.imageUrl"
            style="object-fit: cover; width: 250px; height: 250px"
            class="card-img-top img-fluid img-thumbnail mx-auto"
            alt="..."
          />
          <div class="card-body">
            <div class="mb-3">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">
                {{ product.description }}
              </p>
            </div>
          </div>
          <div class="card-footer justify-content-between d-flex">
            <div class="ms-auto me-1">
              <router-link
                :to="`/one_product/${product.id}`"
                class="btn btn-primary"
                >查看更多</router-link
              >
            </div>
            <div>
              <button
                type="button"
                class="btn btn-danger"
                @click.prevent="add_product(product.id)"
                :disabled="loading_item === product.id"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- loading -->
    <loadingComponent></loadingComponent>

</template>

<script type="module">
import emitter from '@/utils/emitter.js'
import loadingComponent from '@/components/load.vue'

export default {
  components: {
    loadingComponent
  },
  data () {
    return {
      products: [],
      loading_item: ''
    }
  },
  methods: {
    //* 取得產品
    get_products () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((res) => {
        this.products = res.data.products
      })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    //* 加入購物車
    add_product (id) {
      this.loading(id)
      const data = {
        product_id: id,
        qty: 1
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http.post(url, { data: data }).then((res) => {
        alert(res.data.message)
        emitter.emit('get-cart')
      })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    //* 單個物件_加載效果
    loading (id) {
      this.loading_item = id
      setTimeout(() => {
        this.loading_item = ''
      }, 1000)
    }
  },
  mounted () {
    this.get_products()
  }
}
</script>
