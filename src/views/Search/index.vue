<template>
  <div class="SearchIndex">
    <!-- 搜索部分 -->
    <form action="/" class="search">
      <van-search
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        background="#3296fa"
        @focus="visibleSearchSuggestion"
        @blur="visibleSearchResults"
      />
    </form>
    <!-- 搜索历史/结果/建议 -->
    <component
      :is="componentName"
      :keywords="keywords"
      :historyKeywords="historyKeywords"
      @setKeywords="setKeywordFn"
      @delfnhistory="delfnhistory"
    ></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'

export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowSearchResults: false,
      historyKeywords: JSON.parse(localStorage.getItem('TT_HISTORY')) || []
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  computed: {
    componentName() {
      // keywords 为空显示搜索历史
      if (this.keywords.trim() === '') {
        return SearchHistory
      }
      // 点击显示搜索结果
      if (this.isShowSearchResults) {
        return SearchResult
      }
      // 显示搜索建议
      return SearchSuggestion
    }
  },

  methods: {
    // 提交时触发
    onSearch() {
      console.log('提交了')
      this.isShowSearchResults = true
      if (this.historyKeywords.indexOf(this.keywords) === -1) {
        this.historyKeywords.unshift(this.keywords)
        // 将搜索历史存入本地
        localStorage.setItem('TT_HISTORY', JSON.stringify(this.historyKeywords))
      } else {
        const index = this.historyKeywords.findIndex(
          (item) => item === this.keywords
        )
        // 删除历史中原有数据
        this.historyKeywords.splice(index, 1)
        // 再添加数据
        this.historyKeywords.unshift(this.keywords)
        // 将搜索历史存入本地
        localStorage.setItem('TT_HISTORY', JSON.stringify(this.historyKeywords))
      }
    },
    // 返回上一页
    backToPrePage() {
      this.$router.go(-1)
    },
    // 搜索框获取焦点
    visibleSearchSuggestion() {
      // 获取焦点将 isShowSearchResults 改为false 计算属性将重新计算,最终显示搜索建议
      this.isShowSearchResults = false
    },
    // 点击搜索建议||历史修改keywords
    setKeywordFn(key) {
      this.keywords = key
      if (this.historyKeywords.indexOf(key) === -1) {
        this.historyKeywords.unshift(key)
        // 存入本地
        localStorage.setItem('TT_HISTORY', JSON.stringify(this.historyKeywords))
      } else {
        const index = this.historyKeywords.findIndex((item) => item === key)
        // 删除历史中原有数据
        this.historyKeywords.splice(index, 1)
        // 再添加数据
        this.historyKeywords.unshift(key)
        // 将搜索历史存入本地
        localStorage.setItem('TT_HISTORY', JSON.stringify(this.historyKeywords))
      }
    },
    // 搜索框失去焦点
    visibleSearchResults() {
      // 让输入框先获取keywords
      setTimeout(() => {
        this.isShowSearchResults = true
      }, 0)
    },
    // 删除对应的历史记录
    delfnhistory(item) {
      const index = this.historyKeywords.findIndex((e) => e === item)
      this.historyKeywords.splice(index, 1)
      localStorage.setItem('TT_HISTORY', JSON.stringify(this.historyKeywords))
    }
  }
}
</script>

<style scoped lang="less">
// 搜索页面
.SearchIndex {
  background-color: #f5f7f9;
  height: 100vh;
}

// 标题
.search {
  div[role='button'] {
    color: #fff;
  }
}
</style>
