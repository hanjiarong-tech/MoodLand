<template>
  <div class="register">
    <div class="register-1">
      <!-- <img src="https://accountstatic.vivo.com.cn/accountstatic.vivo.com.cn/static/img/logo.3c33210.png.webp" alt> -->
      <!-- <p>账号登陆</p> -->
    </div>
    <div class="register-2">
      <label>
        <!-- <span>账号</span> -->
        <input type="text" v-model="user.id" placeholder="请输入手机号">
      </label>
      <label>
        <!-- <span>密码</span> -->
        <input type="password" v-model="user.password" placeholder="请输入密码">
      </label>
    </div>
    <div class="register-3">
      <input type="button" class="btn" @click="login" value="登录">
    </div>
    <div class="register-3">
      <input type="button" class="textbtn" @click="jumpRegister" value="没有账号？去注册">
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
import router from '../../router'
export default {
  data() {
    return {
      user: {
        id: null,
        password: ""
      }
    };
  },
  mounted() {
  },
  methods: {
    login() {
      if (this.user.id == "") {
        Toast({
          message: "请输入手机号",
          duration: 950
        });
        return false;
      }
      if (this.user.password == "") {
        Toast({
          message: "请输入密码",
          duration: 950
        });
        return false;
      }
      let self = this;
      axios.post('http://10.128.245.71:5000/moodland/user/login/' + this.user.id, {
        id: this.user.id,
        password: this.user.password,
      }).then(function (response) {
        //成功时服务器返回 response 数据
        switch (response.data.success) {
          case true:
            Toast({
              message: response.data.msg,
              duration: 950
            });
            localStorage.setItem("user", JSON.stringify(self.user));
            router.push('/main')
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
    },

    jumpRegister() {
      router.push('/register')
    }
  }
}
</script>

<style>
.register {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}

.register-1 {
  margin-top: 25vh
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
  margin-bottom: 1rem;
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
  margin-top:2rem;
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
    background-color: var(--mygreen);

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
</style>

