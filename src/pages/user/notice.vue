<template>
  <div class="setting">
    <van-nav-bar title="消息通知" left-arrow @click-left="back" safe-area-inset-top/>
    <div class="container" v-for="(list2,index) in detail">
      <div class="container-bj" :style = "list2.has_read==0?'background-color: var(--background-gray);':''">
        <div class="bj-left">
          <img :src="list2.picture==null?'../../static/img/avatar.jpg':serverUrl+'/moodland/'+list2.picture">
        </div>
        <div class="bj-right">
          <p class="title">{{ list2.name }}</p>
          <p style="color:var(--deep-gray)">{{ list2.content }}</p>
        </div>
        <div class="bj-action">
          <van-button v-if="list2.notice_type == 1 && list2.action==0" icon="success" type="primary" style="background-color:rgb(73 185 92);border: 0px;color: white;" @click = "acceptNotice(index)">同意</van-button>
          <van-button disabled v-if="list2.notice_type == 1 && list2.action==1" type="primary" style="background-color:transparent;border: 0px;color:var(--deep-gray);">已同意</van-button>
          </div>
      </div>
      <van-divider :style="{margin:0,padding: '0 16px'}"/>
    </div>
  </div>
</template>

<script>
import footer from '@/components/footer/index'
import axios from "axios";
export default {
  data() {
    return {
      serverUrl:process.env.VUE_APP_SERVER_URL,
      user: JSON.parse(localStorage.getItem("user")),
      detail: [
        // {
        //   notice_url: 123456,
        //   user_id: 123,
        //   name: "hqz",
        //   action: 0,
        //   notice_id: 2,
        //   content: "想添加您为好友",
        //   picture: "avatar/123456.jpg",
        //   notice_type: 1,
        //   has_read: 0
        // },
        // {
        //   notice_url: 123456,
        //   user_id: 123,
        //   name: "hqz",
        //   action: 1,
        //   notice_id: 2,
        //   content: "想添加您为好友",
        //   picture: "avatar/123456.jpg",
        //   notice_type: 1,
        //   has_read: 0
        // },
        // {
        //   notice_url: 123456,
        //   user_id: 123,
        //   action: null,
        //   notice_id: 3,
        //   content: "您的日志有新互动了",
        //   picture: "avatar/123456.jpg",
        //   notice_type: 2,
        //   has_read: 0
        // }
      ],
    };
  },
  mounted() {
    this.serverUrl = process.env.VUE_APP_SERVER_URL;
    this.getNotice();
  },
  methods: {
    getNotice() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/notice/${self.user.user_id}/my`,config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data)

      }).catch(function (error) {
        console.log(error);
      });
    },
    acceptNotice(index){
      console.log(this.detail[index])

      var notice_id = this.detail[index].notice_id
      var notice = this.detail[index]
      

      let self = this;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.post(process.env.VUE_APP_SERVER_URL+`/moodland/notice/${self.user.user_id}/${notice_id}/action/answer`,notice,config).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)
        if(response.data.success){
          notice.action = 1;
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
    back(){
      this.readNotice();
      this.$router.back();
    },
    readNotice(){


      let self = this;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      
      axios.put(process.env.VUE_APP_SERVER_URL+`/moodland/notice/${self.user.user_id}/hasRead`,config).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)

      }).catch(function (error) {
        console.log(error);
      });
    },

    
  },
  components: {
    "v-footer": footer,
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
      width: 49%;
      height: 100%;
      float: left;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: space-evenly;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      span {
        font-weight: bold;
      }
    }
    .bj-action{
      float: right;
      display: flex;
      height: 100%;
      width: 25%;
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

