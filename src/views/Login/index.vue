<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="nav-bar"
      title="登录"
      left-arrow
      @click-left="backToPrePage"
    >
      <template v-slot:left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号/验证码表单 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button round size="mini">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },

  methods: {
    // 返回上一步
    backToPrePage() {
      this.$router.back()
    },
    async login() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
html,
body {
  background: #f5f7f9 !important;
}
// 自定义导航栏样式
.nav-bar {
  background-color: #3296fa;

  /deep/ .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
// form 表单域样式
.form {
  .iconfont {
    font-size: 0.49333rem;
  }
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .van-button {
    background-color: #6db4fb;
    border: 0.02667rem solid transparent;
  }

  .van-button--round {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
