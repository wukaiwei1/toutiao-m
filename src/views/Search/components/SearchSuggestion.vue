<template>
  <div>
    <van-cell
      v-for="(item, index) in hightlightData"
      :key="index"
      @click="getSearchUp(item)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api'
export default {
  props: {
    keywords: {
      type: String
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  // 监听keywords的改变
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestions()
      }
    }
  },
  methods: {
    // 获取搜索建议
    async getSearchSuggestions() {
      try {
        const res = await getSearchSuggestions(this.keywords)
        if (res.data.data.options.length === 0) {
          return this.$toast.fail('没有搜索建议了')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取数据失败，请稍后尝试')
      }
    },
    getSearchUp(item) {
      item = item.replace(/<span style="color:red">|<\/span>/g, '')
      this.$emit('setKeywords', item)
    }
  },
  computed: {
    hightlightData() {
      // 将搜索建议的每一项做处理
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 12px;
}
</style>
