<template>
  <div class="my-5 row justify-content-center">
    <Form action="/" v-slot="{ errors }" class="col-md-6" ref="form" @submit="send_orderList" >
      <div class="d-flex mb-5">
        <div>
          <h2>結帳</h2>
        </div>
        <div class="ms-auto">
          <h3>填寫客戶資料</h3>
        </div>
      </div>
      <div>
        <label for="email">E-mail</label>
        <Field
          type="email"
          id="email"
          placeholder="請輸入E-mail"
          class="form-control"
          name="信箱"
          rules="email|required"
          :class="{ 'is-invalid': errors['信箱'] }"
          v-model="form.user.email"
          :disabled="cartList.length === 0"
        >
        </Field>
        <ErrorMessage name="信箱" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
          :disabled="cartList.length === 0"
        >
        </Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required|min:8|max:10"
          v-model="form.user.tel"
          :disabled="cartList.length === 0"
        >
        </Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
          :disabled="cartList.length === 0"
        >
        </Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
          :disabled="cartList.length === 0"
        ></textarea>
      </div>
      <div class="d-flex">
        <div v-if="!cartList.length">
          <h3>
            <strong class="text-danger"
              >購物車目前尚無訂單，可點擊右側"返回"返回購物！</strong
            >
          </h3>
        </div>
        <button type="button" class="btn btn-secondary" @click="$router.push('/product_List')">返回</button>
        <div class="ms-auto">
          <button type="submit" class="btn btn-danger" :disabled="cartList.length === 0">送出訂單</button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import emitter from '@/utils/emitter.js'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
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
    },
    //* 送出訂單
    send_orderList () {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`
      this.$http
        .post(url, { data: this.form })
        .then((res) => {
          alert(res.data.message)
          this.getCart() //* 重新取得購物車資訊，表單 disabled
          emitter.emit('get-cart') // * navbar 重製購物車數量
          this.$refs.form.resetForm()
          this.form.message = ''
          this.$router.push('/product_List')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
