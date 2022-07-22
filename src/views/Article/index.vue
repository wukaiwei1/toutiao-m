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
              :loading="loading"
              round
              size="small"
              type="info"
              class="attentionBtn"
              @click="attentionFn"
            >
              <template #icon> <van-icon name="plus" /> </template>
              关注
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
          v-model="Listloading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
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
      <van-tabbar-item class="pinglunBtn">写评论</van-tabbar-item
      ><van-tabbar-item icon="comment-o" />
      <van-tabbar-item icon="star-o" />
      <van-tabbar-item icon="good-job-o" />
      <van-tabbar-item icon="share" />
    </van-tabbar>
  </div>
</template>

<script>
import { getArticleInfo, getArtistComment } from '@/api'
import getCommentItem from './components/commentsItem.vue'
import dayjs from '@/utils/dayjs'
import '@/assets/css/news.css'
export default {
  name: 'attentionFn',
  data() {
    return {
      ArticleInfo: {},
      loading: false,
      Listloading: false,
      finished: false,
      id: '',
      commentList: []
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
    async getArtistComment() {
      const {
        data: { data }
      } = await getArtistComment('a', this.id)
      this.commentList = data.results
    },
    // 评论触底事件
    onLoad() {
      this.finished = true
      console.log('触底')
    },
    //   返回上一页
    onBackfn() {
      this.$router.back()
    },
    // 点击关注
    attentionFn() {
      // 点击改为加载状态
      this.loading = true
    },
    async getArticleList() {
      this.id = this.$route.query.id
      const { data } = await getArticleInfo(this.id)
      this.ArticleInfo = data.data
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
</style>
