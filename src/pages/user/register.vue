<template>
  <div class="register">
    <div class="register-1">
      <!-- <img
        src="https://accountstatic.vivo.com.cn/accountstatic.vivo.com.cn/static/img/logo.3c33210.png.webp"
        alt
      /> -->
      <p>账号注册</p>
    </div>
    <div class="register-2">
      <label for>
        <span>昵称</span>
        <input type="text" v-model="user.name" placeholder="请输入昵称" />
      </label>
      <label for>
        <span>电话</span>
        <input type="number" v-model="user.id" placeholder="请输入电话号码" />
      </label>
      <label for>
        <span>密码</span>
        <input type="password" v-model="user.password" placeholder="请输入密码" />
      </label>
      <label for>
        <span>确认密码</span>
        <input type="password" v-model="nextpassword" placeholder="请输入密码" />
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
        id:123
      },
      nextpassword: ""
    };
  },
  methods: {
    regusterUser() {
      if (this.user.name == "" || this.user.password == "" || this.user.id == null) {
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
        console.log(typeof(this.user.id))
        axios.post('http://10.128.211.2:5000/moodland/user/user/' + this.user.id,{
          password: this.user.password,
          id: this.user.id,
          user_name:this.user.name,
        },config).then(function (response) {
              //成功时服务器返回 response 数据
              switch (response.data.success) {
                case true:
                  Toast({
                    message: response.data.msg,
                    duration: 950
                  });
                  this.$router.push("/login");
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
  margin-top: 2rem;
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
}

.register-2 label {
  width: 90%;
  margin: auto;
  height: 1.5rem;
  border-bottom: 0.03rem solid #f2f2f2;
  display: flex;
}

.register-2 label span {
  width: 16vw;
  font-size: 0.4rem;
  line-height: 1.5rem;
  display: block;
  float: left;
}

.van-radio {
  font-size: 14px;
}

.register-2 label input {
  width: 80%;
  font-size: 0.4rem;
  padding-left: 0.3rem;
}

.register-3 {
  display: flex;
}

.btn {
  width: 9rem;
  height: 1.1rem;
  margin: 0 auto;
  margin-bottom: 0.3rem;
  text-align: center;
  line-height: 1.1rem;
  font-size: 0.45rem;
  color: #fff;
  border-radius: 0.6rem;
  background-color: #46a1fa;
  background-image: linear-gradient(90deg, #418eff, #4566ff);
}
</style>

