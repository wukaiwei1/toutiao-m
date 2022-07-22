<template>
  <van-cell-group inset>
    <van-cell :title="(commentList && commentList.aut_name) || '暂无'">
      <template #icon>
        <img :src="(commentList && commentList.aut_photo) || '暂无'" alt="" />
      </template>
      <template #label>
        <div class="commentInfo">
          {{ (commentList && commentList.content) || '暂无' }}
        </div>
        <div class="commentTime">
          <span>{{ pubdate || '暂无' }}</span>
          <van-button class="huifuBtn" @click="showPopUp = true"
            >回复{{ commentList.reply_count }}
          </van-button>
          <van-popup
            v-model="showPopUp"
            :style="{ height: '100%', width: '100%' }"
            position="bottom"
            closeable
            close-icon-position="top-left"
          >
            <popup
              :commentList="commentList"
              :num="commentList.reply_count"
              :id="commentList.com_id"
            ></popup>
          </van-popup>
        </div>
      </template>
      <template #default>
        <van-icon
          :class="{ liveIcon: commentList.is_liking === true }"
          name="good-job-o"
          :ref="commentList.com_id"
          :badge="praise ? praise : ''"
        />
        <span @click="likeFn(commentList.com_id)" class="praise"> 赞</span>
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
import dayjs from '@/utils/dayjs'
import popup from './PopUp'
import { getcommentGoods, setcommentGoods } from '@/api'
export default {
  name: 'sareItem',
  data() {
    return {
      showPopUp: false,
      id: '',
      isLiking: ''
    }
  },
  props: {
    commentList: {
      type: Object
    }
  },
  components: {
    popup
  },
  computed: {
    // 计算时间
    pubdate() {
      const art = this.commentList
      const time = dayjs(art.pubdate).fromNow()
      return time
    },
    praise() {
      return this.commentList.like_count
    }
  },
  methods: {
    // 点赞
    async likeFn(id) {
      this.id = id
      const name = this.$refs[id].className
      if (name === 'van-icon van-icon-good-job-o') {
        try {
          await getcommentGoods(id)
          this.$refs[id].className = 'van-icon van-icon-good-job-o liveIcon'
          // 点赞成功提示
          this.$toast.success('点赞成功')
          this.commentList.like_count++
        } catch (error) {
          console.log(error)
        }
      } else {
        // 取消点赞
        try {
          await setcommentGoods(id)
          this.$refs[id].className = 'van-icon van-icon-good-job-o'
          // 取消点赞提示
          this.$toast('点赞取消')
          this.commentList.like_count ? this.commentList.like_count-- : 0
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  margin-top: 40px;
  :deep([class*='van-hairline']::after) {
    border-top: 0;
  }
  :deep(.van-cell) {
    padding: 0 !important;
    padding-bottom: 30px !important;
  }
  :deep(.van-cell__title) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
    > span:nth-child(1) {
      color: #406599;
    }
  }
  :deep(.van-cell-group) {
    margin: 0;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 0;
    }
  }
  :deep(.van-cell__label) {
    margin: 0;
    .commentInfo {
      margin: 30px 0;
      color: #333;
    }
  }
}
:deep(.huifuBtn) {
  margin-left: 48px;
  height: 48px;
  color: #333;
  border-radius: 24px;
}
:deep(.commentTime) {
  display: flex;
  align-items: center;
  color: #333;
}
.liveIcon {
  color: gold;
}
:deep( .van-cell__value) {
  padding-top: 30px;
  .praise {
    padding-left: 10px;
  }
}
</style>
