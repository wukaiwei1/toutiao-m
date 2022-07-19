<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search"></van-icon>
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tab选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <!-- 更多按钮 -->
      <span class="iconfont icon-gengduo" @click="showPopUp"></span>
    </van-tabs>

    <!-- 弹出框 -->
    <EditChanneIPopup
      ref="popup"
      :mychannels="channels"
      @delMychannel="delchannels"
      @activeChange="activeChanges"
      @addChannel="addChannels"
    ></EditChanneIPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsToLocal,
  delUserChannel,
  addmyChannel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChanneIPopup from './component/EditChanneIPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      channels: []
    }
  },
  created() {
    this.getMyChannels()
  },
  components: {
    ArticleList,
    EditChanneIPopup
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    // 获取频道列表
    async getMyChannels() {
      try {
        if (!this.isLogin) {
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.channels = myChannels
          } else {
            const { data } = await getMyChannels()
            this.channels = data.data.channels
          }
        } else {
          const { data } = await getMyChannels()
          this.channels = data.data.channels
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    showPopUp() {
      this.$refs.popup.isShow = true
    },
    // 删除我的频道
    async delchannels(id) {
      this.channels = this.channels.filter((item) => item.id !== id)
      // 判断是否在登录状态进行修改
      if (!this.isLogin) {
        setMyChannelsToLocal(this.channels)
      } else {
        try {
          await delUserChannel(id)
        } catch (error) {
          return this.$toast.fail('删除失败，请稍后再试')
        }
      }
      this.$toast.success('删除频道成功')
    },
    // 切换我的频道
    activeChanges(index) {
      this.active = index
    },
    // 添加我的频道
    async addChannels(mychannels) {
      this.channels.push(mychannels)
      // 判断是否在登录状态进行修改
      if (!this.isLogin) {
        setMyChannelsToLocal(this.channels)
      } else {
        // 登录状态
        try {
          await addmyChannel(mychannels.id, this.channels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style scoped lang="less">
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 999;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
