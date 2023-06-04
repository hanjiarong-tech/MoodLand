<template>
  <div class="setting">
    <!-- <v-header title="设置" :headerLeftStatus="headerLeftStatus" :save="save" /> -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <div class="content">
      <van-cell @click="openFile" title="头像" is-link>
        <template #default>
          <img :src="avatar" style="width:30px; height:30px;border-radius: 50%;" alt="用户头像">
        </template>
      </van-cell>
      <van-cell @click="nameshow = true" title="昵称" :value="namevalue" is-link />
      <van-cell title="性别" :value="columns[gendervalue]" @click="showPicker = true" is-link />
      <van-cell center title="提醒开关">
        <template #right-icon>
          <van-switch :value="checked" @input="onInput" />
        </template>
      </van-cell>
      <van-cell @click="passshow = true" title="修改密码" :value="passvalue" is-link />
      <!-- 修改性别弹出层 -->
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="saveGender" />
      </van-popup>
      <!-- 修改用户昵称弹出层 -->
      <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
        <van-field v-model="namevalue" center clearable label="用户名" placeholder="请输入用户名">
          <template #button>
            <van-button size="small" @click="saveName()" type="primary">保存</van-button> </template>
        </van-field>
      </van-popup>
      <!-- 导入修改avatar子组件 -->
      <div class="file">
        <!-- <van-popup v-model="show" round position="bottom" :style="{ height: '15%' }"> -->
        <div class="updateAva">
          <!-- <div @click="openFile">从相册中选择</div> -->
          <input @change="changImg" ref="inputFileRef" type="file" style="display: none;">
          <!-- <div class="borderDiv">拍照</div> -->
        </div>
      </div>

    </div>
    <div class="down">
      <van-button color="#ff1111" @click="logout" type="primary" block>退出登录</van-button>
      <van-button color="#dd32dd" @click="logoff" type="primary" block>注销账户</van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import filePopup from '@/components/filePopup/filePopup'
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      headerLeftStatus: true,
      checked: false,
      avatar: JSON.parse(localStorage.getItem("user")).avatar,
      nameshow: false,
      namevalue: "",
      gendervalue: 2,
      showPicker: false,
      passvalue: "",
      columns: ['男', '女', '无性别'],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {

    this.searchInfoData()
  },
  methods: {
    onInput(checked) {
      Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      }).then(() => {
        this.checked = checked;
        localStorage.setItem("notice", this.checked)
      });
    },
    logout() {
      Dialog.confirm({
        title: '提醒',
        message: '是否退出登录？',
      }).then(() => {
        this.$router.push("/")
      });
    },
    logoff() {
      Dialog.confirm({
        title: '提醒',
        message: '是否注销账号？',
      }).then(() => {
        axios.delete(process.env.VUE_APP_SERVER_URL + `/user/user/${this.user.user_id}`).then(function (response) {
          this.$router.push("/")
        }).catch(function (error) {
          Toast({
            message: "注销失败",
            duration: 950
          });
        })

      });
    },
    // 修改头像
    openFile() {
      this.$refs.inputFileRef.click()
    },
    changImg() {
      let that = this
      const file = this.$refs.inputFileRef.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', function () {
        ImagePreview({
          images: [
            reader.result
          ],
          closeable: true,
          onClose: that.closeProcess,
        })
      })
    },
    closeProcess() {
      this.$dialog.confirm({
        title: '提示',
        message: '确定要修改头像吗'
      }).then(async () => {
        // 得到图片
        const path = this.$refs.inputFileRef.files[0]
        // 发送图片对象
        const fd = new FormData()
        fd.append('file', path)
        let self = this;
        console.log(123);
        axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${self.user.user_id}/avatar/action/upload`, fd).then(function (response) {
          //成功时服务器返回 response 数据
          console.log(window.URL.createObjectURL(path))
          self.avatar= window.URL.createObjectURL(path)
          self.user.avatar=window.URL.createObjectURL(path)
          console.log(self.user.avatar)
          localStorage.setItem("user",self.user)
        }).catch(function (error) {
        });
      })
    },
    searchInfoData() {
      let self = this;
      console.log(process.env.VUE_APP_SERVER_URL);
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${self.user.user_id}`, {
      }).then(function (response) {
        response.data.avatar = response.data.avatar == null ? '../../../static/img/avatardefault.png' : process.env.VUE_APP_SERVER_URL + '/moodland/' + response.data.avatar;
        console.log("response.data.avatar", response.data.avatar)
        self.avatar = response.data.avatar
        self.namevalue = response.data.user_name;
        response.data.remind == 0 ? self.checked = false : self.checked = true;
        self.gendervalue = response.data.sex
        //成功时服务器返回 response 数据
        console.log(response.data)
      }).catch(function (error) {
        console.log(error);
      });
    },
    saveName() {
      let self = this
      axios.put(process.env.VUE_APP_SERVER_URL + `/user/user/${self.user.user_id}/name/actions/modify`, {
        name: self.namevalue
      }).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response)
      }).catch(function (error) {
        console.log(error);
      });
      this.nameshow = false;
    },
    saveGender(value) {
      switch (value) {
        case "无性别":
          this.gendervalue = 2;
          break;
        case "男":
          this.gendervalue = 0;
          break;
        case "女":
          this.gendervalue = 1;
          break;
      }
      this.showPicker = false;
    },
    async changeAvatar() {
      console.log("上传头像")
    },
    openAvatar() {
      this.$refs.avatarRef.show = true;
    },
  },
  components: {
    "v-header": header,
    "v-footer": footer,
    "filePopup": filePopup
  },
  mounted: function () {
    this.searchInfoData();
  }
}
</script>

<style scoped>
.content {
  top: auto;
  position: relative;
  width: 100%;
}

.setting {
  background-color: var(--background-gray);
  height: 100vh
}

.down {
  position: relative;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 14vh;
}
</style>

