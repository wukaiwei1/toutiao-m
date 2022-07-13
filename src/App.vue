<template>
  <div>
    <!-- 一级路由的出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
  created() {
    console.dir(request)
  }
}
</script>

<style scoped>
.box {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
