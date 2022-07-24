<template>
  <div style="margin-top: 80px">
    <img :src="photo" alt="" ref="img" style="width: 375px; height: 480px" />
    <button class="btn" @click="confirm">完成</button>
    <button class="isHide" @click="isback">取消</button>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { getuserPic } from '@/api'
export default {
  props: ['photo'],
  mounted() {
    const img = this.$refs.img

    this.myCropper = new Cropper(img, {
      viewMode: 1,
      background: false,
      highlight: false,
      scalable: true
    })
  },
  methods: {
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        try {
          await getuserPic(fm)
          this.$toast.success('修改成功')
          // 更新数据
          this.$emit('UpdateUserinfo')
        } catch (error) {
          console.log(error)
        } finally {
          this.$emit('isHide')
        }
      })
    },
    isback() {
      this.$emit('isHide')
    }
  }
}
</script>

<style scoped>
.btn {
  position: fixed;
  right: 0;
  bottom: 0;
}
.isHide {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
