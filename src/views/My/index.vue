<template>
  <div class="my">
    <!-- 头部部分 -->
    <header>
      <!-- 登录时显示 -->
      <div v-if="isShow" class="user_info banner">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row_2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button
                class="code-btn"
                round
                size="mini"
                @click="$router.push('/userEdit')"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 用户文章数量 -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录时显示 -->
      <div v-else class="login_info banner">
        <div class="wrap" @click="goLogin">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录 / 注册 </span>
        </div>
      </div>
    </header>
    <!-- 主体部分 -->
    <main>
      <van-grid column-num="2" clickable class="grid">
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知/小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 退出按钮 -->
    <van-button v-if="isShow" block class="backBtn" @click="logOut"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isShow() {
      // 将结果转换为布尔值
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logOut() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出该账号'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    goLogin() {
      this.$router.push('/login')
    },
    // 获取用户信息
    async getUserInfo() {
      if (this.isShow) {
        try {
          // 解构赋值
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        } catch (error) {
          this.$store.commit('setUser', {})
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
// 背景图
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat center / cover;
}
// 用户信息样式
.user_info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row_2 {
    .van-col {
      height: 100%;
    }
    .mobile {
      font-size: 0.4rem;
      color: #fff;
    }
    .code-btn {
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }
    .code-row {
      height: 100%;
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem !important;
      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
  }
}

// 退出区域
.backBtn {
  .van-button__text {
    color: red;
  }
}

.login_info {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-content: center;
    color: #fff;
    font-size: 28px;
    img {
      width: 126px;
      height: 126px;
      margin-bottom: 10px;
    }
  }
}
</style>
