<template>
  <div class="register">
    <div class="register-1">
    </div>
    <div class="register-2">
      <label for>
        <!-- <span>昵称</span> -->
        <input type="text" v-model="user.name" placeholder="昵称" />
      </label>
      <label for>
        <!-- <span>电话</span> -->
        <input type="number" v-model="user.user_id" placeholder="手机号码" />
      </label>
      <label for>
        <!-- <span>密码</span> -->
        <input type="password" v-model="user.password" placeholder="密码" />
      </label>
      <label for>
        <!-- <span>确认密码</span> -->
        <input type="password" v-model="nextpassword" placeholder="确认密码" />
      </label>
      <!-- <label for>
        <span>性别</span>
        <van-radio-group van-radio-group v-model="user.sex" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
          <van-radio name="3">其他</van-radio>
        </van-radio-group>
      </label> -->
    </div>
    <div class="register-3">
      <input type="button" class="btn" @click="regusterUser" value="注册" />
    </div>
    <div class="register-3">
      <input type="button" class="textbtn" @click="jumpLogin" value="已有账号？去登录">
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { RadioGroup, Radio } from 'vant';
import axios from "axios";

export default {
  data() {
    return {
      user: {
        name: "",
        password: "",
        user_id:null,
        avatar:"../../../static/img/avatar.svg"
      },
      nextpassword: ""
    };
  },
  mounted(){
    this.user.avatar=process.env.VUE_APP_SERVER_URL + '/moodland/vue/'+'img/avatar.svg'
  },
  methods: {
    regusterUser() {
      var self = this
      if (this.user.name == "" || this.user.password == "" || this.user.user_id == null) {
        Toast({
          message: "输入内容不能为空",
          duration: 950
        });
        return false;
      }
      else if (this.nextpassword !== this.user.password) {
        Toast({
          message: "两次密码输入不一致",
          duration: 950
        });
        return false;
      }
      else {
        const config = {
          headers: {
            'Content-type': "application/json"
          }
        }
        var md5pwd1 = this.$md5(this.user.password)
        var md5pwd2 = this.$md5(md5pwd1+this.user.user_id)
        console.log(typeof(this.user.id))
        axios.post(process.env.VUE_APP_SERVER_URL+'/moodland/user/user/' + this.user.user_id,{
          password: md5pwd2,
          id: this.user.user_id,
          user_name:this.user.name,
        },config).then(function (response) {
              //成功时服务器返回 response 数据
              switch (response.data.success) {
                case true:
                  Toast({
                    message: response.data.msg,
                    duration: 950
                  });
                  localStorage.setItem("user", JSON.stringify(self.user));
                  self.$router.push('/main')
                  break;
                case false:
                  Toast({
                      message: response.data.msg,
                      duration: 950
                    });
                  break;
              }
              

            }).catch(function (error) {
              console.log(error);
            });
      }
    },
    jumpLogin() {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.register-1 {
  margin-top: 15vh
}

.register-1 img {
  width: 3rem;
  display: block;
  margin: 0.6rem auto;
}

.register-1 p {
  color: black;
  text-align: center;
  font-size: 0.5rem;
}


.register-2 {
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.register-2 label {
  width: 8.5rem;
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
    background: rgb(248,248,248);
}

.register-3 {
  display: flex;
  margin-top:1.5rem;
}

.btn {
  width: 8.5rem;
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
.textbtn{
  text-align: center;
    line-height: 0.5rem;
    color: #888;
    margin: 0 auto;
    font-size: 0.4rem;
    background: transparent;
}

.van-radio {
  font-size: 14px;
}


</style>

