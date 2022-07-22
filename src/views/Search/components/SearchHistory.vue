<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <van-icon name="delete-o" @click="isDel" v-if="isShow" />
        <template v-else>
          <span @click="delAll">全部删除 </span>
          <span @click="offDel"> 完成</span>
        </template>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in historyKeywords"
      :key="index"
      :title="item"
      @click="getSearchUp(item)"
    >
      <van-icon name="close" @click="delFn(item)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    historyKeywords: {
      type: Array
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    getSearchUp(item) {
      this.$emit('setKeywords', item)
    },
    // 点击头部删除按钮
    isDel() {
      console.log(123456)
      this.isShow = false
    },
    // 点击完成按钮
    offDel() {
      this.isShow = true
    },
    // 点击删除全部按钮
    delAll() {
      // 将搜索历史置空
      this.$parent.historyKeywords = []
      // 清空本地存储
      this.isShow = true
      console.log(123)
      localStorage.removeItem('TT_HISTORY')
    },
    // 删除对应的历史记录
    delFn(item) {
      this.$emit('delfnhistory', item)
    }
  }
}
</script>

<style></style>
