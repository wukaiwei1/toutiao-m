<template>
  <div class="userApp">
    <!-- 标题 -->
    <van-nav-bar
      class="editTitle"
      title="个人信息"
      left-arrow
      @click-left="getBack"
    />

    <!-- 头像 -->
    <van-cell title="头像" is-link>
      <!-- 自定义上传样式 -->
      <van-uploader
        :after-read="afterRead"
        :preview-image="false"
        :showIndex="false"
      >
        <van-image
          round
          width="31px"
          height="31px"
          :src="userInfoList.photo"
        ></van-image>
      </van-uploader>
    </van-cell>
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      is-link
      :value="userInfoList.name"
      @click="nickShow = true"
    />
    <!-- 性别 -->
    <van-cell title="性别" is-link :value="userSex" @click="sexShow = true" />
    <!-- 生日 -->
    <van-cell
      title="生日"
      is-link
      :value="userInfoList.birthday"
      @click="bdayShow = true"
    />
    <!-- 弹框 -->
    <!-- <van-popup v-model="show">内容</van-popup> -->

    <!-- 头像弹出层 -->
    <van-popup
      v-if="imgShow"
      v-model="imgShow"
      position="bottom"
      :style="{ height: '100%', width: '100%', background: '#333' }"
    >
      <UpdatePhoto
        :photo="photo"
        @isHide="isHide"
        @UpdateUserinfo="UpdateUserinfo"
      ></UpdatePhoto>
    </van-popup>

    <!-- 昵称弹出框 -->
    <van-popup
      v-model="nickShow"
      position="bottom"
      :style="{ height: '100%', width: '100%', background: '#333' }"
    >
      <nickNamePhoto
        @isHide="isHide"
        @upNickname="upNickname"
        :nickname="userInfoList.name"
      ></nickNamePhoto>
    </van-popup>

    <!-- 性别弹出框 -->
    <van-popup
      v-model="sexShow"
      position="bottom"
      :style="{ height: '40%', width: '100%', background: '#333' }"
    >
      <van-picker
        title="标题"
        show-toolbar
        :columns="usersixe"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <!-- 生日弹框 -->

    <van-popup
      v-model="bdayShow"
      position="bottom"
      :style="{ height: '40%', width: '100%', background: '#333' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="addDday"
        @cancel="offDday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getuserMessage, setUserMessage } from '@/api'
import UpdatePhoto from './components/UpdatePhoto.vue'
import nickNamePhoto from './components/nicknamePhoto.vue'
import dayjs from 'dayjs'
export default {
  name: 'nikcname',
  data() {
    return {
      // 用户资料
      userInfoList: {
        name: '',
        gender: '',
        birthday: '',
        real_name: '',
        intro: ''
      },
      // 头像弹框显隐
      imgShow: false,
      photo: '',
      // 昵称弹框显隐
      nickShow: false,
      // 性别
      usersixe: ['男', '女'],
      // 性别框
      sexShow: false,
      // 生日弹框
      bdayShow: false,
      // 年月日数据
      minDate: new Date(1945, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2020, 1, 1)
    }
  },
  created() {
    this.getuserMessage()
  },
  mounted() {
    // 给文件上传绑定change事件
    // this.$refs.file.addEventListener('change', (e) => {
    //   // 拿到上传图片的url
    //   const file = e.target.files[0]
    //   // 将url转换为img可以识别的src路径
    //   // FileReader文件阅读器
    //   const fr = new FileReader()
    //   fr.readAsDataURL(file)
    //   //
    //   fr.onload = (e) => {
    //     this.photo = e.target.result
    //     this.show = true
    //   }
    // })
  },
  components: {
    UpdatePhoto,
    nickNamePhoto
  },
  methods: {
    // 文件上传是触发
    afterRead(file) {
      // 获取图片的base64格式
      this.photo = file.content
      this.imgShow = true
    },
    // 返回上一级
    getBack() {
      this.$router.back()
    },
    async getuserMessage() {
      try {
        const { data } = await getuserMessage()
        this.userInfoList = { ...data.data }
        console.log(this.userInfoList)
      } catch (error) {}
    },
    // 编辑用户信息
    async setUserMessage() {
      try {
        console.log(this.userInfoList)
        await setUserMessage({ ...this.userInfoList })
        this.$toast('修改成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 图片框
    isHide() {
      this.imgShow = false
      this.nickShow = false
    },
    // 昵称框
    upNickname(nickname) {
      this.userInfoList.name = nickname
      // 调用更新页面数据方法
      this.$nextTick(() => {
        this.setUserMessage()
      })
      // 关闭弹框
      this.nickShow = false
    },
    // 更新页面数据
    UpdateUserinfo() {
      this.getuserMessage()
    },
    // 性别弹框确认按钮回调
    onConfirm(val) {
      // console.log(val)
      if (val === '女') {
        this.userInfoList.gender = 1
        console.log(1)
      }
      if (val === '男') {
        this.userInfoList.gender = 0
        console.log(0)
      }
      // 调用更新页面数据方法
      this.$nextTick(() => {
        this.setUserMessage()
      })

      // 关闭弹框
      this.sexShow = false
    },
    // 性别弹框取消按钮回调
    onCancel() {
      console.log('取消')
      this.sexShow = false
    },
    // 点击生日按钮确认回调
    addDday() {
      // console.log('确认')
      this.userInfoList.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 调用更新页面数据方法
      this.$nextTick(() => {
        this.setUserMessage()
      })
      this.bdayShow = false
    },
    // 点击生日弹框取消按钮
    offDday() {
      this.bdayShow = false
    }
  },
  computed: {
    userSex() {
      if (this.userInfoList.gender === 0) {
        return '男'
      } else {
        return '女'
      }
    }
  }
}
</script>

<style scoped lang="less">
.userApp {
  height: 100vh;
  background-color: #f5f7f9;
}

// 标题
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
</style>
