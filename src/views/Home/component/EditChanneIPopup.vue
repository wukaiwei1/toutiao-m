<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    close-icon-position="top-left"
  >
    <div class="popupMain">
      <!-- 我的频道标题 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>

        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in mychannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-change': item.name === '推荐' }"
            @click="delMychannel(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-show="isEdit && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="5px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addChannel(item)"
          />
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api'
export default {
  props: {
    mychannels: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      isShow: true,
      allchannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    //   获取所有频道
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allchannels = data.data.channels
    },
    // 删除我的频道
    delMychannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('delMychannel', channel.id)
      }
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('activeChange', index)
      }
    },
    // 添加我的频道
    addChannel(channel) {
      this.$emit('addChannel', { ...channel })
    }
  },
  computed: {
    recommendChannels() {
      // 总的频道减去我的频道就是推荐频道
      return this.allchannels.filter((item) => {
        return !this.mychannels.find((e) => e.id === item.id)
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-change {
  :deep(.van-grid-item__text) {
    color: #ff69b4;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    padding: 0 30px;
    height: 48px;
    color: red;
    border: 0.02667rem solid red;
  }
  // 我的频道
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: -24px;
          right: -20px;
          transform: translate(20%, -35%);
          transform: scale(0.6, 0.6);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.64rem;
        }
      }
    }
  }
  //   推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-grid-item__icon {
        // margin-right: 10px;
        font-size: 0.5rem;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
    :deep(.van-cell::after) {
      border: 0;
    }
  }
}
</style>
