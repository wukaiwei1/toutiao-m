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
    <van-form ref="form" @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            :time="3 * 1000"
            v-if="isShow"
            @finish="isShow = false"
          />
          <van-button round size="mini" v-else @click.prevent="sendCode"
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: false
    }
  },
  // created() {
  //   console.log(this)
  // },
  methods: {
    // 返回上一步
    backToPrePage() {
      this.$router.back()
    },
    // 登录
    async login() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // 存了token
        this.$store.commit('setUser', res.data.data)
        // 跳转页面
        this.$router.push('/profile')
        // 提示成功
        this.$toast.success('登录成功！')
      } catch (error) {
        const status = error.response.status
        let message = '服务器拥挤，刷新试试~'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    // 发送验证码
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        // 发起获取验证码请求
        await sendCode(this.mobile)
        this.isShow = true
      } catch (error) {
        // 表单校验错误
        if (!error.response) {
          this.$toast.fail(error.message)
        } else {
          // 请求错误
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
