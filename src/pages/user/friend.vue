<template>
  <div class="setting">
    <van-nav-bar title="好友列表" left-arrow @click-left="$router.back()" />
    <form action="/">
      <van-search v-model="searchId" shape="round" show-action placeholder="搜索好友id添加新好友" @search="onSearch"
        @cancel="onCancel" />
    </form>

    <div v-show="!search" class="container" v-for="list2 in detail">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="list2.avatar == null ? '../../../static/img/avatar.jpg' : serverUrl + '/moodland/' + list2.avatar">
        </div>
        <div class="bj-right">
          <p class="title">{{ list2.friend_name }}</p>
          <van-tag color="var(--light-yellow)" text-color="orange" round type="primary" size="large">亲密度：{{
            list2.intimacy }}</van-tag>
          <!-- <p style="color:var(--deep-gray)">{{ list2.describe }}</p> -->
        </div>
        <div class="bj-action">
          <van-button icon="point-gift" type="primary"
            style="font-size: 1.2em;background-color: transparent;color: #ff8917;border: 0;"
            @click="sendGift(list2.friend_id, list2.intimacy)" />
        </div>
      </div>

      <van-divider :style="{ margin: 0, padding: '0 16px' }" />
    </div>

    <div v-show="search" class="container" v-for="listRes in searchRes">
      <div class="container-bj">
        <div class="bj-left">
          <img
            :src="listRes.avatar == null ? '../../../static/img/avatar.jpg' : serverUrl + '/moodland/' + listRes.avatar">
        </div>
        <div class="bj-right">
          <p class="title">{{ listRes.user_name }}</p>
          <!-- <p style="color:var(--deep-gray)">{{ listRes.content }}</p> -->
        </div>
        <div class="bj-action">
          <van-button v-if="listRes.can_add" type="primary"
            style="background-color:rgb(73 185 92);border: 0px;color: white;"
            @click="addFriend(listRes.user_id)">添加</van-button>
          <!-- <van-button disabled v-if="!listRes.can_add" type="primary" style="background-color:transparent;border: 0px;color:var(--deep-gray);">已同意</van-button> -->
        </div>
      </div>
      <van-divider :style="{ margin: 0, padding: '0 16px' }" />
    </div>
    <!-- 显示礼物 -->
    <van-popup round v-model="showGift" :style="{ width: '90%' }">
      <div>
        <div class="register-2">
          <van-grid :column-num="3">
            <van-grid-item v-for="gift in giftlist">
              <van-badge :content="gift.min_intimacy" max="99" color="orange">
              <div class="div2" :style="intimacy < gift.min_intimacy ? 'opacity:0.5;pointer-events:none;' : ''"
                @click="setInfo(gift)">
                <van-image :src="serverUrl + '/moodland/' + gift.gift_picture" />
                <p>{{ gift.gift_name }}</p>
              </div>
              </van-badge>
            </van-grid-item>
          </van-grid>
            <input v-model="advice" type="text"/>
        </div>
        <div class="register-3">
          <input type="button" class="btn" @click="give()" value="确认赠送" />
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import axios from "axios";
import footer from '@/components/footer/index'
export default {
  data() {
    return {
      search: false,
      serverUrl: process.env.VUE_APP_SERVER_URL,
      user: JSON.parse(localStorage.getItem("user")),
      searchId: null,
      giftlist: [],
      intimacy: 0,
      friedid: null,
      giftInfo: {},
      date: "",
      // giftInfo: {
      //   gift_id: null,
      //   gift_name: "",
      //   gift_picture: "",
      //   min_intimacy: 0,
      // },
      showGift: false,
      advice: "送给你喵",
      detail: [
        // {
        //   avatar: null,
        //   friend_name: "名字",
        //   intimacy:89,
        //   describe: "描述",
        // },
        // {
        //   avatar: null,
        //   friend_name: "名字",
        //   intimacy:89,
        //   describe: "描述"
        // },
      ],
      searchRes: [],

    };
  },
  components: {


  },
  mounted() {
    this.serverUrl = process.env.VUE_APP_SERVER_URL;

    this.getFriend()
  },
  methods: {
    getFriend() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/friend/${self.user.user_id}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data)
      }).catch(function (error) {
        console.log(error);
      });
    },
    setInfo(Info) {
      self.giftInfo = Info;
    },
    // 获取当前时间
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      //此处可以拿外部的变量接收，也可直接返回  strDate:2022-05-01 13:25:30
      this.date = strDate;
    },
    // 获取礼物列表
    sendGift(friend_id, intimacy) {
      let self = this;
      self.showGift = true;
      self.intimacy = intimacy;
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/gift/type`).then(function (response) {
        self.giftlist = response.data;
        console.log(self.giftlist)
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 赠送礼物
    give() {
      let self = this;
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/social/gift/${self.user.user_id}/send`, {
        "socialGift": {
          advice: self.advice,
          giftInfo: self.giftInfo,
          gift_id: self.giftInfo.gift_id,
          gift_num: 1,
          giver_id: self.user.user_id,
          recipient_id: self.friedid,
          send_id: '',
          send_time: self.date
        }
      }).then(function (response) {
        self.showGift = false;
      }).catch(function (error) {
        console.log(error);
      });
    },
    onSearch(val) {
      this.searchId = val
      let self = this;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/user/user/${val}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.searchRes = []
        if (response.data != null) {
          var searchUser = response.data
          searchUser["can_add"] = true
          for (var index in self.detail) {
            var friend = self.detail[index]
            if (searchUser.user_id == friend.friend_id || searchUser.user_id == self.user.user_id) {
              searchUser["can_add"] = false
              break;
            }
          }
          self.searchRes.push(searchUser)
          console.log(searchUser)
        }
        self.search = true
      }).catch(function (error) {
        console.log(error);
      });
    },
    onCancel() {
      this.search = false
    },
    addFriend(user_id) {
      let self = this;
      let notice = {
        action: 0,
        content: "请求添加您为好友",
        has_read: 0,
        notice_id: 0,
        notice_type: 1,
        notice_url: self.user.user_id,
        user_id: user_id
      }
      console.log(notice)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/notice/${user_id}`, notice, config).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)
        self.$toast("已发送申请")

      }).catch(function (error) {
        console.log(error);
      });
    }
  },

}
</script>

<style lang="less" scoped>
.register-2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin:0.2rem;
}

.register-2 label {
  width: 7.5rem;
  font-size: 0.4rem;
  line-height: 1.1rem;
  margin-bottom: 0.6rem;
  border-radius: 0.2rem;
}

.register-2 .div2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-2 .div2 :hover {
  background: #eef0f4;
  border: #000000;
}

.register-2 p {
  font-size: 0.4rem;
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
  font-size: 0.2rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
  background: rgb(248, 248, 248);
}

.register-3 {
  display: flex;
  margin-top: 0.3rem;
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

.reply-input {
  font-size: 13px;
  width: 100%;
  height: 50px;
  border-top: 1px solid #d9d9d9;
  position: absolute;
  bottom: 0;
  left: 0;
  align-items: center;
  display: flex;
  background-color: #fff;

  input {
    line-height: 40px;
    width: 85%;
    padding: 0 10px;
  }

  input:focus {
    border: none;
  }
}

.container {
  width: 100%;
  height: 2rem;
  top: 1.45rem;
  background-color: white;

  .container-bj {
    width: 100%;
    height: 100%;

    .bj-left {
      width: 26%;
      height: 100%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 15vw;
        height: 15vw;
        border-radius: 10%;
      }
    }

    .bj-right {
      width: 55%;
      height: 100%;
      float: left;
      display: -webkit-box;
      display: -ms-flexbox;
      // display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: space-evenly;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      // -ms-flex-direction: column;
      flex-direction: column;

      span {
        font-weight: bold;
      }
    }

    .bj-action {
      float: right;
      display: flex;
      height: 100%;
      width: 19%;
      align-content: center;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 50%;
    }

    .title {
      font-size: 0.45rem;
      font-weight: bold;
    }

    p {
      font-size: 0.35rem;
      color: #000000;
    }
  }
}

.content {
  top: auto;
  position: absolute;
  width: 100%;
}

.setting {
  background-color: var(--background-gray);
  height: 100vh
}
</style>

