<template>
  <div>
    <h2>你好，我是首頁</h2>
  </div>

  <!-- loading -->
  <loadingComponent></loadingComponent>
</template>

<script>
import loadingComponent from '@/components/load.vue'

export default {
  components: {
    loadingComponent
  }
}
</script>
