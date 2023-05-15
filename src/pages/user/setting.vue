<template>
  <div class="setting">
    <!-- <v-header title="设置" :headerLeftStatus="headerLeftStatus" :save="save" /> -->
    <van-nav-bar title="个人信息" right-text="保存" left-arrow @click-left="$router.back()" @click-right="save" />
    <div class="content">
      <van-cell @click="openAvatar" title="头像" is-link>
        <template #default>
          <img src="../../../static/img/头像.jpg" width="30px" height="30px" alt="用户头像">
        </template>
      </van-cell>
      <van-cell @click="nameshow = true" title="昵称" :value="123" is-link />
      <van-cell title="性别" :value="0 === 0 ? '男' : '女'" is-link />
      <!-- 修改用户昵称弹出层 -->
      <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
        <van-field required placeholder="请输入" />
      </van-popup>

      <!-- 导入修改头像子组件 -->
      <filePopup ref="avatarRef" />
      <van-cell center title="提醒开关">
        <template #right-icon>
          <van-switch :value="checked" @input="onInput" />
        </template>
      </van-cell>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import filePopup from '@/components/filePopup/filePopup'
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      headerLeftStatus: true,
      checked: true,
      nameshow: false,

    };
  },
  mounted() {
  },
  methods: {
    onInput(checked) {
      Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      }).then(() => {
        this.checked = checked;
      });
    },
    searchInfoData() {
      // let self = this;
      // console.log(123);
      // axios.post('http://10.128.245.71:5000/moodland/notice/' + 123456, {
      //   content: "123",
      //   has_read: 0,
      //   notice_id: 1,
      //   notice_url: 0,
      //   notice_type: 1,
      // }).then(function (response) {
      //   //成功时服务器返回 response 数据
      //   console.log(response.data)
      // }).catch(function (error) {
      //   console.log(error);
      // });
    },
    save() {
      // let self = this;
      // console.log(123);
      // axios.post('http://10.128.245.71:5000/moodland/notice/' + 123456, {
      //   content: "123",
      //   has_read: 0,
      //   notice_id: 1,
      //   notice_url: 0,
      //   notice_type: 1,
      // }).then(function (response) {
      //   //成功时服务器返回 response 数据
      //   this.$toast.success('修改成功')
      // }).catch(function (error) {
      //   this.$toast.success('修改失败')
      // });
    },
    openAvatar(){
      this.$refs.avatarRef.show=true;
    },
  },
    components: {
      "v-header": header,
      "v-footer": footer,
      "filePopup":filePopup
    },
    mounted: function () {
      this.searchInfoData();
    }
  }
</script>

<style scoped>
.content {
  top: 2rem;
  position: absolute;
  width: 100%;
}
</style>

