<template>
  <!-- loading -->
  <div class="position-absolute top-50 start-50" v-show="loading_status">
    <div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading_status: false
    }
  },
  methods: {
    //* 螢幕讀取_加載效果
    loading_window (time) {
      this.loading_status = true
      setTimeout(() => {
        this.loading_status = false
      }, time)
    }
  },
  mounted () {
    this.loading_window(500)
  }
}
</script>
