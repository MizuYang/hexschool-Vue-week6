<template>
  <div class="container">
    <div class="text-center mb-3">
      <h2>購物車</h2>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <table class="table text-center align-middle fs-4">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>金額</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-if="cartList">
              <tr v-for="product in cartList" :key="product.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="remove_cart_product(product.id)"
                  >
                    刪除
                  </button>
                </td>
                <td>
                  <img
                    :src="product.product.imageUrl"
                    style="width: 200px; height: 150px; object-fit: cover"
                    alt=""
                    class="img-fluid"
                  />
                </td>
                <td>
                  <span class="fs-3">{{ product.product.title }}</span>
                </td>
                <td style="width: 150px">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model="product.qty"
                      @blur="update_product_qty(product)"
                      :disabled="loading_item === product.id"
                    />
                    <span class="input-group-text">{{
                      product.product.unit
                    }}</span>
                  </div>
                </td>
                <td>{{ product.product.price }}元</td>
                <td>
                  {{ product.total }}
                </td>
                <td></td>
              </tr>
            </template>

            <template v-if="cartList.length === 0">
              <tr>
                <td></td>
                <td></td>
                <td>無</td>
                <td>無</td>
                <td>無</td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div>
                  <button
                    type="button"
                    class="btn btn-secondary p-3 fs-4"
                    @click="$router.push('/product_List')"
                  >
                    返回
                  </button>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td>總計</td>
              <td>{{ product_total }} 元</td>
              <td>
                <button
                  type="button"
                  @click="$router.push('/form')"
                  class="btn btn-outline-danger p-3 fs-4"
                  :disabled="cartList.length === 0"
                >
                  結帳
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <!-- loading -->
  <loadingComponent></loadingComponent>
</template>

<script type="module">
import loadingComponent from '@/components/load.vue'
import emitter from '@/utils/emitter.js'

export default {
  components: {
    loadingComponent
  },
  data () {
    return {
      cartList: [],
      product_total: 0,
      loading_item: '',
      loading_status: false
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
    },
    // *刪除產品
    remove_cart_product (id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http
        .delete(url)
        .then((res) => {
          this.getCart()
          alert(res.data.message)
          emitter.emit('remove_cart_product')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    //* 修改產品數量
    update_product_qty (product) {
      this.loading(product.id)
      if (!product.qty) {
        alert('請輸入正確數字')
        this.getCart()
        return
      }
      const data = {
        product_id: product.product_id,
        qty: product.qty
      }
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${product.id}`
      this.$http
        .put(url, { data: data })
        .then((res) => {
          this.getCart()
          alert(res.data.message)
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
    this.getCart()
  }
}
</script>
