<template>
  <div>
    <!-- 渲染没有图片的文章 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDacs"
    />

    <!-- 渲染一张图片的文章 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDacs"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>

    <!-- 渲染三张图片的文章 -->
    <van-cell
      v-if="articleInfo.cover.type === 3"
      :title="articleInfo.title"
      :label="articleDacs"
    >
      <template #label>
        <!-- 图片内容 -->
        <div>
          <van-image
            width="2.7rem"
            height="2rem"
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <!-- 文字内容 -->
        <span>{{ articleDacs }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDacs() {
      const art = this.articleInfo
      const time = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${time}`
    }
  }
}
</script>

<style scoped lang="less">
// 图片样式
:deep(.van-image) {
  margin-right: 25px;
}
</style>
