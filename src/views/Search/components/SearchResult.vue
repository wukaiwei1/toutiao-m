<template>
  <div>
    <van-list
      v-model="loading"
      offset="0"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，请点击重新加载！"
    >
      <van-cell
        v-for="(item, index) in ResultsList"
        :key="index"
        :title="item.title"
        @click="getSearchUp(item)"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api'
export default {
  props: {
    keywords: { type: String }
  },
  data() {
    return {
      ResultsList: [],
      loading: false,
      finished: false,
      error: false,
      // 页数初始值
      page: 1
    }
  },
  created() {
    this.getSearchResults()
  },
  methods: {
    // 获取搜索结果
    async getSearchResults() {
      try {
        const { data } = await getSearchResults(this.keywords, this.page)
        this.ResultsList = data.data.results
      } catch (error) {
        console.log(error)
      }
    },

    // 触底事件
    async onLoad() {
      console.log('触底事件')
      try {
        if (Math.random() < 0.7) {
          throw new Error('出错了')
        }
        this.page++
        const { data } = await getSearchResults(this.keywords, this.page)
        this.ResultsList.push(...data.data.results)
        if (data.data.results.length < 10) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
