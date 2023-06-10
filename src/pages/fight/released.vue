<template>
  <div class="fight">
    <van-nav-bar title="我发布的" left-arrow @click-left="$router.back()" safe-area-inset-top/>
    <div class="container" v-for="list2 in detail">
      <div class="container-bj" @click="jumpTo(list2.challenge_id)">
        <div class="bj-left">
          <img :src="'../../static/challenge/'+list2.type+'.svg'">
        </div>
        <div class="bj-right">
          <p class="title">{{ moodtype[list2.type] }}挑战</p>

          <p>发起人：{{ list2.initiator_id }}</p>
          <p :v-if="list2.end_time != null">截止时间：{{ list2.end_time }}</p>

        </div>
        <div :v-if="list2.max_num != null" class="bj-action">
          <van-tag :color="list2.join_num / list2.max_num > 0.6 ? `orange` : `var(--light-yellow)`"
            :text-color="list2.join_num / list2.max_num > 0.6 ? `white` : `orange`" round type="primary" size="large">{{
              list2.join_num }} / {{ list2.max_num }}</van-tag>
          <p style="position:relative;top:14%;z-index:999;" @click.stop="deleteThis(list2.challenge_id)">删除</p>
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
  name: 'freleased',
  data() {
    return {
      detail: [
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
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
    deleteThis(challenge_id){
      let self=this;
      axios.delete(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}/${challenge_id}`).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });

    },

    jumpTo(challenge_id) {
      console.log(challenge_id);
      router.push({ path: `/detail`, query: { challenge_id: challenge_id,show:false} })
    }




  },

  mounted() {
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
  padding: 0 0 100px 0;
}



.container {
  width: 95%;
  height: 2.5rem;
  border-radius: 8px;
  top: 1.45rem;
  background-color: rgba(255, 255, 255, 0.7);
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
        font-size: 0.35rem;
        color: var(--middlegray);
        display: inline;
      }
    }

    .bj-action {
      float: right;
      display: flex;
      height: 100%;
      width: 19%;
      align-content: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        font-size: 0.35rem;
        color: var(--middlegray);
      }
    }

    img {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 50%;
    }

    .title {
      font-size: 0.45rem;
      font-weight: bold;
      color: var(--deepgray);
    }

    p {
      font-size: 0.35rem;
      color: var(--middlegray);
    }
  }
}
</style>

