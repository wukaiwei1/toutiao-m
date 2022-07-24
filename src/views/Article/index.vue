<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="黑马头条" left-arrow fixed @click-left="onBackfn">
      <template #left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>
    <div class="ArticleInfo">
      <!-- 文章title -->
      <div class="ArtTitle">
        <h2>{{ ArticleInfo.title || '暂无' }}</h2>
      </div>
      <!-- 作者信息 -->
      <div class="artInfo">
        <van-row>
          <van-col span="4">
            <img :src="ArticleInfo.aut_photo" alt="" class="artPic" />
          </van-col>
          <van-col span="10" class="artName">
            <span>{{ ArticleInfo.aut_name || '暂无' }}</span>
            <p>{{ artData || '暂无' }}</p>
          </van-col>
          <van-col span="10">
            <van-button
              :loading="Btnloading"
              round
              size="small"
              type="info"
              class="attentionBtn"
              @click="attentionFn"
            >
              <template #icon>
                <van-icon :name="isFollowed ? 'success' : 'plus'" />
              </template>
              {{ isFollowed ? '已关注' : '关注' }}
            </van-button>
          </van-col>
        </van-row>
      </div>
      <!-- 文章信息 -->
      <div
        class="article-content markdown-body articleIN"
        v-html="ArticleInfo.content"
      ></div>
      <!-- 正文结束 -->
      <div class="endText">
        <span class="endtitle">正文结束</span>
      </div>
      <!-- 评论 -->
      <div class="comment">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          offset="50"
        >
          <getCommentItem
            v-for="(item, index) in commentList"
            :key="index"
            :commentList="item"
          />
        </van-list>
      </div>
    </div>
    <!-- 底部功能按钮 -->
    <van-tabbar class="bottomBtn">
      <van-tabbar-item class="pinglunBtn" @click="isShowPopUp"
        >写评论</van-tabbar-item
      >
      <van-popup v-model="showPop" position="bottom" :style="{ height: '20%' }"
        ><van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        >
          <template #extra
            ><span class="release" @click.enter="releaseFn">发布</span>
          </template>
        </van-field>
      </van-popup>
      <van-tabbar-item icon="comment-o" :badge="total_count" />
      <van-tabbar-item
        icon="star"
        @click="getCollection"
        :class="{ liveArticle: isCollected === true }"
      />
      <van-tabbar-item
        icon="good-job"
        @click="getLikeArticle"
        :class="{ goodLive: attitude === 1 }"
      />
      <van-tabbar-item icon="share" />
    </van-tabbar>
  </div>
</template>

<script>
import {
  getArticleInfo,
  getArtistComment,
  getCollection,
  offCollection,
  getConcern,
  offConcern,
  getLikeArticle,
  offLikeArticle,
  partFive
} from '@/api'
import getCommentItem from './components/commentsItem.vue'
import dayjs from '@/utils/dayjs'
import '@/assets/css/news.css'

export default {
  name: 'attentionFn',
  data() {
    return {
      // 文章信息
      ArticleInfo: {},
      Btnloading: false,
      loading: false,
      finished: false,
      // 文章id
      id: '',
      // 用户的id
      autId: '',
      commentList: [],
      // 点赞的Id
      lastId: '',
      // 评论的数量
      total_count: '',
      // 是否收藏文章
      isCollected: '',
      // 是否关注作者
      isFollowed: '',
      // 是否对文章点赞
      attitude: '',
      // 发布评论弹框
      showPop: false,
      // 评论信息
      message: ''
    }
  },
  created() {
    //  获取文章数据
    this.getArticleList()
    // 获取文章评论
    this.getArtistComment()
  },
  components: {
    getCommentItem
  },
  methods: {
    // 显示发布弹框
    isShowPopUp() {
      this.showPop = true
    },
    // 发布评论
    async releaseFn() {
      try {
        await partFive(this.id, this.message)
        // 添加提示
        this.$toast.success('评论成功')
        this.showPop = false
        // 清空
        this.message = ''
        // 获取文章评论
        this.getArtistComment()
      } catch (error) {
        console.log(error)
        this.$toast('请登录后或稍后重试')
      }
    },
    // 获取文章评论
    async getArtistComment() {
      const {
        data: { data }
      } = await getArtistComment('a', this.id)
      console.log(data)
      // 最后一个评论的id，用于请求下一页数据
      this.lastId = data.last_id
      // 评论数据
      this.commentList = data.results
      // 评论数量
      this.total_count = data.total_count
    },
    // 评论触底事件
    async onLoad() {
      try {
        const {
          data: { data }
        } = await getArtistComment('a', this.id, this.lastId)
        this.commentList.push(...data.results)
        this.lastId = data.last_id
        if (!this.lastId) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    //   返回上一页
    onBackfn() {
      this.$router.back()
    },
    // 点击关注作者
    async attentionFn() {
      // 点击改为加载状态
      this.Btnloading = true
      if (!this.isFollowed) {
        try {
          // 关注
          const { data } = await getConcern(this.autId)
          console.log(data)
          this.Btnloading = false
          this.isFollowed = true
        } catch (error) {}
      } else {
        try {
          // 取消
          const { data } = await offConcern(this.autId)
          console.log(data)
          this.Btnloading = false
          this.isFollowed = false
        } catch (error) {}
      }
    },
    // 对文章点赞
    async getLikeArticle() {
      console.log(123456)
      if (this.attitude === -1 || this.attitude === 0) {
        const { data } = await getLikeArticle(this.id)
        console.log(data)
        // 添加提示
        this.$toast.success('点赞成功')
        this.attitude = 1
      } else {
        const { data } = await offLikeArticle(this.id)
        console.log(data)
        // 取消点赞提示
        this.$toast('取消点赞')
        this.attitude = -1
      }
    },
    // 获取文章数据
    async getArticleList() {
      this.id = this.$route.query.id
      const { data } = await getArticleInfo(this.id)
      // 是否收藏
      this.isCollected = data.data.is_collected
      // 是否关注作者
      this.isFollowed = data.data.is_followed
      // 用户的id
      this.autId = data.data.aut_id
      // 是否对文章点赞
      this.attitude = data.data.attitude
      // 文章数据
      this.ArticleInfo = data.data
      // 图片预览
      this.$nextTick(() => {})
      console.log(this.ArticleInfo)
    },
    // 收藏OR取消收藏文章
    async getCollection() {
      // 判断是否收藏
      if (this.isCollected) {
        // 取消收藏
        await offCollection(this.id)
        this.isCollected = false
        // 取消收藏提示
        this.$toast('取消收藏')
      } else {
        // 添加收藏
        await getCollection(this.id)
        this.isCollected = true
        // 添加提示
        this.$toast.success('收藏成功')
      }
    }
  },
  computed: {
    artData() {
      const art = this.ArticleInfo
      const time = dayjs(art.pubdate).fromNow()
      return time
    }
  }
}
</script>

<style scoped lang="less">
// 标题
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}

// 文章内容部分
.ArticleInfo {
  padding: 0 32px 150px;
  // 文章标题
  .ArtTitle {
    margin-top: 142px;
    h2 {
      font-size: 40px;
    }
  }
  //   作者信息
  .artInfo {
    .artPic {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 0;
    }
    .artName {
      font-size: 24px;
      p {
        margin: 0;
        color: #b7b7b7;
      }
    }
    .attentionBtn {
      margin-left: 120px;
      width: 170px;
      height: 60px;
    }
  }
  // 文章信息
  .articleinfo {
    padding: 54px 0;
    width: 100%;
  }
  :deep(.articleIN p) {
    text-indent: 2em !important;
  }
  .endText {
    position: relative;
    margin-top: 80px;
    height: 50px;
    width: 100%;
    text-align: center;
    .endtitle {
      width: 100%;
      border: 0;
      color: #969799;
      font-size: 28px;
      &::before {
        content: '';
        position: absolute;
        top: 16px;
        left: 14px;
        height: 30%;
        display: inline-block;
        width: 37%;
        border-bottom: 1px solid #ccc;
      }
      &::after {
        content: '';
        position: absolute;
        top: 16px;
        right: 14px;
        height: 30%;
        display: inline-block;
        width: 37%;
        border-bottom: 1px solid #ccc;
      }
    }
  }
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
}
// 底部按钮
.bottomBtn {
  :deep(.van-tabbar-item--active) {
    flex: 3;
  }
  :deep(.pinglunBtn .van-tabbar-item__text) {
    width: 80%;
    display: block;
    font-size: 0.4rem;
    text-align: center;
    line-height: 0.61333rem;
    color: #a7a7a7;
    border-radius: 25px;
    border: 1px solid #f2f2f2;
  }
  // :deep(.van-tabbar-item__text) {
  //   border: 0;
  // }
}
.liveArticle {
  color: pink;
}
.goodLive {
  color: red;
}

// 弹框
:deep(.van-field .van-cell__value) {
  margin-top: 28px;
  margin-right: 60px;
  padding: 20px 20px 0 32px;
  height: 160px;

  background-color: #f5f7f9;
}
:deep(.release) {
  line-height: 8;
  color: #258292;
}
</style>
