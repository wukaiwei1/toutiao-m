<template>
  <div>
    <!-- 文章结构 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onLoad"
      :success-text="istext ? '刷新成功' : '刷新失败,请重新试试'"
    >
      <van-list
        @load="onLoad"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了，请点击重新加载！"
      >
        <getArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></getArticleItem> </van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
// 引入item组件
import getArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      // 下一页时间戳
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false,
      istext: ''
    }
  },
  components: {
    getArticleItem
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取文章数据
    async getArticleList() {
      try {
        // +new Date() 获取当前时间戳 或者 Date.now()
        const { data } = await getArticleList(this.id, Date.now())
        // 保存文章数据
        this.articles = data.data.results
        // 时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        // 状态不为200
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新试试')
        }
      }
    },
    // 更新下一页数据
    async onLoad() {
      try {
        if (Math.random() < 0.7) {
          throw new Error('出错了')
        }
        this.istext = true
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        // 判断是下拉刷新还是下滑刷新
        // 当下拉是refreshLoading会自动变为true
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 时间戳
        this.pre_timestamp = data.data.pre_timestamp
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.istext = false
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
