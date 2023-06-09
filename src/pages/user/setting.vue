<template>
  <div class="setting">
    <!-- <v-header title="设置" :headerLeftStatus="headerLeftStatus" :save="save" /> -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <div class="content">
      <van-cell @click="openFile" title="头像" is-link>
        <template #default>
          <img :src="avatar" style="width:30px; height:30px;border-radius: 50%;object-fit: cover;" alt="用户头像">
        </template>
      </van-cell>
      <van-cell @click="nameshow = true" title="昵称" :value="namevalue" is-link />
      <van-cell title="性别" :value="columns[gendervalue]" @click="showPicker = true" is-link />
      <van-cell center title="提醒开关">
        <template #right-icon>
          <van-switch :value="checked" @input="onInput" />
        </template>
      </van-cell>
      <van-cell @click="showPwd = true" title="修改密码" :value="passvalue" is-link />
      <!-- 修改密码弹出层 -->
      <van-popup round v-model="showPwd" :style="{ width: '90%' }">
        <div>
          <div class="register-2">
            <label for>
              <input type="password" v-model="password" placeholder="输入原密码" />
            </label>
            <label for>
              <input type="password" v-model="nextpassword" placeholder="输入新密码" />
            </label>
            <label for>
              <input type="password" v-model="nextpassword1" placeholder="确认新密码" />
            </label>
          </div>
          <div class="register-3">
            <input type="button" class="btn" @click="confirmPwd" value="确认修改" />
          </div>
        </div>
      </van-popup>
      <!-- 修改性别弹出层 -->
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="saveGender" />
      </van-popup>
      <!-- 修改用户昵称弹出层 -->
      <van-popup v-model="nameshow" position="bottom" :style="{ height: '30%' }">
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
      <van-button color="var(--mygreen)" @click="logout" type="primary" block
        style="margin-bottom: 0.5rem;">退出登录</van-button>
      <van-button color="var(--mygreen)" @click="logoff" type="primary" block>注销账户</van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { Toast } from "mint-ui";
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
      showPwd: false,
      columns: ['男', '女', '无性别'],
      user: JSON.parse(localStorage.getItem("user")),
      password: "",
      nextpassword1: "",
      nextpassword: "",
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
    // 修改密码
    confirmPwd() {
      let self = this;
      if (!this.password || !this.nextpassword || !this.nextpassword1) {
        Toast({
          message: "输入内容不能为空",
          duration: 950,
          position: 'bottom',
          className: "toastIndex"
        });
        return false;
      } else if (this.nextpassword !== this.nextpassword1) {
        Toast({
          message: "新密码两次输入不一致",
          duration: 950,
          position: 'bottom',
          className: "toastIndex"
        });
      } else {
        // 修改密码接口
        var md5pwd1 = this.$md5(self.password)
        var md5pwd2 = this.$md5(md5pwd1 + self.user.user_id)
        var md5pwd3 = this.$md5(self.nextpassword)
        var md5pwd4 = this.$md5(md5pwd3 + self.user.user_id)
        axios.put(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${self.user.user_id}/password/action/modify`, {
          old_pwd: md5pwd2,
          new_pwd: md5pwd4
        }).then(function (response) {
          // self.showPwd=false
          Toast({
            message: response.data.msg,
            duration: 950,
            position: 'bottom',
            className: "toastIndex"
          });
          console.log(response.data)
        }).catch(function (error) {
          console.log(error);
        });
      }
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
        console.log("sssssssssssssss", path)
        // 发送图片对象
        let self = this;
        const fd = new FormData()
        const lastavatar = self.user.avatar
        const lastavatar2 = lastavatar.split('/')[lastavatar.split('/').length - 1]
        console.log("avatar/" + lastavatar2)
        if (lastavatar == "../../../static/img/avatardefault.png") {
          fd.append('last_url', "",)
        } else {
          fd.append('last_url', "avatar/" + lastavatar2)
        }
        fd.append('file', path)
        console.log(123);
        axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${self.user.user_id}/avatar/action/upload`, fd)
          .then(function (response) {
            //成功时服务器返回 response 数据
            console.log("info", response.data.info)
            console.log(window.URL.createObjectURL(path))
            self.avatar = window.URL.createObjectURL(path)
            console.log(self.user.avatar)
            console.log("msg", response.data.msg)
            self.$toast(response.data.msg)
            searchInfoData()
          }).catch(function (error) {
            self.$toast("上传失败")
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
      axios.put(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${self.user.user_id}/name/actions/modify`, {
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

<style lang="less" scoped>
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
  padding: 0.3rem;
  position: relative;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}

.register-2 {
  margin: 0.6rem 0.4rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.register-2 label {
  width: 100%;
  font-size: 0.4rem;
  line-height: 1.1rem;
  margin-bottom: 0.6rem;
  border-radius: 0.2rem;
}



.register-2 label span {
  width: 20%;
  font-size: 0.5rem;
  line-height: 1.5rem;
  display: block;
  float: left;
}

.register-2 label input {
  width: 100%;
  font-size: 0.4rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
  background: rgb(248, 248, 248);
}

.register-3 {
  display: flex;
  margin-bottom: 0.5rem;
}

.btn {
  width: 3.5rem;
  height: 1.1rem;
  margin: 0 auto;
  /* margin-top: 0.72rem; */
  margin-bottom: 0.3rem;
  text-align: center;
  line-height: 1.1rem;
  font-size: 0.45rem;
  color: #fff;
  border-radius: 0.2rem;
  background-color: var(--mydarkblue);
  /* background-image: linear-gradient(90deg, #418eff, #4566ff); */
}
</style>

