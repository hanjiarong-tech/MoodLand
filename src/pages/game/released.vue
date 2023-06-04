<template>
  <div class="fight">
    <van-nav-bar title="我发布的" left-arrow @click-left="$router.back()" />
    <div class="container" v-for="list2 in detail">
      <div class="container-bj" @click ="jumpTo(list2.challenge_id)">
        <div class="bj-left">
          <img :src="list2.img==null?'../../../static/img/avatar.jpg':list2.img">
        </div>
        <div class="bj-right">
          <p class="title">{{ moodtype[list2.type] }}挑战</p>
          <p>发起人：{{list2.initiator_id}}</p>
          <p :v-if="list2.end_time!=null">截止时间：{{ list2.end_time }}</p>
        </div>
        <div :v-if="list2.max_num!=null" class = "bj-action">
          <van-tag :color="list2.join_num / list2.max_num>0.6?`orange`:`var(--light-yellow)`" :text-color="list2.join_num / list2.max_num>0.6?`white`:`orange`" round type="primary" size="large">{{ list2.join_num}} / {{ list2.max_num}}</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import footer from '@/components/footer/index'
import axios from "axios";
import router from '../../router';
export default {
  name: 'greleased',
  data() {
    return {
      detail: [
        {
          img: "../../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },

      ],
      user: JSON.parse(localStorage.getItem("user")),
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
    };
  },

  methods: {

    getMyChallenge() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      // `http://10.128.245.71:5000/moodland/${user.avatar}`
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/social/challenge/${self.user.user_id}`,config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径

      }).catch(function (error) {
        console.log(error);
      });
    },
    jumpTo(challenge_id){
      console.log(challenge_id);
      router.push({path:`/detail`,query: {challenge_id: challenge_id}})
    }



    
  },

  mounted: function () {
    //使用h5的读取文件api
    // var reader = new FileReader();
    //     reader.readAsDataURL(this.file);
    //     //读取完成后触发
    //     reader.onload = function () {
    //     //改变img的路径
    //         document.querySelector("van-image").src = this.result;
    //     };
    this.getMyChallenge();
    
  },

  components: {
    "v-footer": footer,
  },
}
</script>

<style lang="less" scoped>
.fight {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 0 0 100px 0;
}

.container-order {
  width: 90%;
  height: 2.5rem;
  background: rgb(255, 255, 255);
  display: block;
  margin: 0.15rem auto;
  font-size: 0.35rem;

  .container-order-2 {
    width: 100%;
    margin: 0;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div {
      width: 25%;
      display: flex;
      flex-direction: column;

      i {
        width: 0.8rem;
        height: 0.8rem;
        margin: auto;
      }

      span {
        text-align: center;
        padding-top: 0.3rem;
      }
    }
  }



}

.container {
  width: 95%;
  height: 2.5rem;
  border-radius: 8px;
  top: 1.45rem;
  background-color: rgba(255,255,255,0.7);
  margin: 10px auto;

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
        width: 18vw;
        height: 18vw;
        border-radius: 10%;
      }
    }

    .bj-right {
      width: 55%;
      height: 100%;
      float: left;
      padding: 0.2rem 0;
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
      width:19%;
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
      color:var(--deepgray);
    }

    p {
      font-size: 0.35rem;
      color:var(--middlegray);
    }
  }
}
</style>

