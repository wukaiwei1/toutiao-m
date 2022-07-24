<template>
  <div id="nickPart">
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="isback"
      @click-right="onClickRight"
    />
    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: this.nickname
    }
  },
  props: ['nickname'],
  methods: {
    onClickRight() {
      console.log(this.message, this.nickname)
      if (this.message === this.nickname) {
        this.$toast('修改的昵称不能与原昵称一致')
        return
      }
      this.$emit('upNickname', this.message)
    },
    isback() {
      this.$emit('isHide')
    }
  }
}
</script>

<style scoped lang="less">
#nickPart {
  height: 100vh;
  background-color: #fff;
}
:deep(.van-nav-bar__text) {
  color: #fff !important;
}
:deep(.van-field) {
  padding-left: 0;
}
</style>
