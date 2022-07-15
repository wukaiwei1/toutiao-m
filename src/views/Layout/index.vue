<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/ ">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
          <p class="text">首页</p>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
          <p class="text">视频</p>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
          <p class="text">问答</p>
        </template>
      </van-tabbar-item>

      <van-tabbar-item to="/profile">
        <template #icon>
          <i class="iconfont icon-wode"></i>
          <p class="text">我的</p>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.van-tabbar-item {
  line-height: 1.5;
  .van-tabbar-item__icon {
    display: flex;
    justify-content: center;
    align-items: space-evenly;
    height: 100%;
    margin: 0;
    .text {
      margin: 0;
      font-size: 0.32rem;
    }
    .iconfont {
      font-size: 0.53333rem;
    }
  }
}
</style>
