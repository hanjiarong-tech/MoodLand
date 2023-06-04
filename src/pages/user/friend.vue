<template>
  <div class="setting">
    <van-nav-bar title="好友列表" left-arrow @click-left="$router.back()" />
    <form action="/">
      <van-search
        v-model="searchId"
        shape="round"
        show-action
        placeholder="搜索好友id添加新好友"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>

    <div v-show = "!search" class="container" v-for="list2 in detail" >
      <div class="container-bj">
        <div class="bj-left">
          <img :src="list2.avatar==null?'../../../static/img/avatar.jpg':serverUrl+'/moodland/'+list2.avatar">
        </div>
        <div class="bj-right">
          <p class="title">{{ list2.friend_name }}</p>
          <van-tag color="var(--light-yellow)" text-color="orange" round type="primary" size="large">{{ list2.intimacy}}</van-tag>
          <!-- <p style="color:var(--deep-gray)">{{ list2.describe }}</p> -->
        </div>
        <div class="bj-action">
          <van-button icon="point-gift" type="primary" style="font-size: 1.2em;background-color: transparent;color: #ff8917;border: 0;" @click="sendGift(list2.friend_id)"/>
        </div>
      </div>
      
      <van-divider :style="{margin:0,padding: '0 16px'}"/>
    </div>

    <div v-show = "search" class="container" v-for="listRes in searchRes">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="listRes.avatar==null?'../../../static/img/avatar.jpg':serverUrl+'/moodland/'+listRes.avatar">
        </div>
        <div class="bj-right">
          <p class="title">{{ listRes.user_name }}</p>
          <!-- <p style="color:var(--deep-gray)">{{ listRes.content }}</p> -->
        </div>
        <div class="bj-action">
          <van-button v-if="listRes.can_add" type="primary" style="background-color:rgb(73 185 92);border: 0px;color: white;" @click = "addFriend(listRes.user_id)">添加</van-button>
          <!-- <van-button disabled v-if="!listRes.can_add" type="primary" style="background-color:transparent;border: 0px;color:var(--deep-gray);">已同意</van-button> -->
          </div>
      </div>
      <van-divider :style="{margin:0,padding: '0 16px'}"/>
    </div>


  </div>
</template>

<script>
import axios from "axios";
import footer from '@/components/footer/index'
export default {
  data() {
    return {
      search:false,
      serverUrl:process.env.VUE_APP_SERVER_URL,
      user: JSON.parse(localStorage.getItem("user")),
      searchId:null,
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
      searchRes:[],
      
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
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/friend/${self.user.user_id}`,config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data)

      }).catch(function (error) {
        console.log(error);
      });
    },
    sendGift(friend_id){
      let self = this;
      console.log("send to"+friend_id);
    },
    onSearch(val){
      this.searchId = val
      let self = this;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/user/user/${val}`,config).then(function (response) {
        //成功时服务器返回 response 数据
        self.searchRes = []
        if(response.data!=null){
          var searchUser = response.data
          searchUser["can_add"]=true
          for(var index in self.detail){
            var friend = self.detail[index]
            if(searchUser.user_id == friend.friend_id || searchUser.user_id == self.user.user_id){
              searchUser["can_add"]=false
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
    onCancel(){
      this.search = false
    },
    addFriend(user_id){
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
      axios.post(process.env.VUE_APP_SERVER_URL+`/moodland/notice/${user_id}`,notice,config).then(function (response) {
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
    .bj-action{
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
    .title{
      font-size: 0.45rem;
      font-weight: bold;
    }

    p {
      font-size: 0.35rem;
      color:#000000;
    }
  }
}
</style>

<style scoped>
.content {
  top: auto;
  position: absolute;
  width: 100%;
}
.setting{
  background-color: var(--background-gray);
  height:100vh

}
</style>

