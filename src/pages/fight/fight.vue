<template>
  <div class="fight">
    <!-- 挑战功能 -->
    <div class="container-order">
      <div class="container-order-2">
        <div v-for="list in container" @click="jumpTo(list.link)" :style="list.style">
          <i :class="list.img"></i>
          <span>{{ list.name }}</span>
        </div>
      </div>
    </div>
    <van-cell title="发现挑战" icon="search" style="font-weight: bold;background-color: transparent;" />
    <!-- <p style="font-size: 20px;">发现挑战</p> -->
    <!-- 发现挑战 -->
    <div class="container" v-for="list2 in detail">
      <div class="container-bj" @click="jumpTo2(list2.challenge_id)">
        <div class="bj-left">
          <img :src="'../../static/challenge/'+list2.type+'.svg'">
        </div>
        <div class="bj-right">
          <div>
            <span class="title">{{ moodtype[list2.type] }}挑战</span>
          </div>
          <p>发起人：{{ list2.initiator_name }}</p>
          <p :v-if="list2.end_time != null">截止时间：{{ list2.end_time }}</p>
        </div>
        <div :v-if="list2.max_num != null" class="bj-action">
          <van-tag :color="list2.join_num / list2.max_num > 0.6 ? `orange` : `var(--light-yellow)`"
            :text-color="list2.join_num / list2.max_num > 0.6 ? `white` : `orange`" round type="primary" size="large">{{
              list2.join_num }} / {{ list2.max_num }}</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/data'
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import router from '../../router';
import axios from "axios";

export default {
  data() {
    return {
      news: [],
      user: JSON.parse(localStorage.getItem("user")),
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      container: [
        {
          img: "iconfont icon-fabuguanli",
          name: "发布挑战",
          style: "background-color:var(--light-yellow);color:orange",
          link: "/post"
        },
        {
          img: "iconfont icon-gongdanjilu",
          name: "我发布的",
          style: "background-color:var(--light-green);color:var(--mygreen)",
          link: "/freleased"
        },
        {
          img: "iconfont icon-hands-fill",
          name: "我参与的",
          style: "background-color:var(--light-blue);color:var(--mydarkblue)",
          link: "/finvolved"
        },
      ],
      detail: [
      ],
    };
  },
  methods: {
    tryon() {
      router.push("/main");
    },
    jumpTo(link) {
      console.log(link);
      router.push({ path: link, query: { postType: 0 } });
    },
    jumpTo2(challenge_id) {
      console.log(challenge_id);
      router.push({ path: `/detail`, query: { challenge_id: challenge_id + "",show:true } })
    },
    getMyChallenge() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}/myNotJoin`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  mounted() {
    this.getMyChallenge();
  },
  components: {
    "v-header": header,
    "v-footer": footer
  }
};
</script>

<style lang="less" scoped>
.fight {
  top: 50px;
  position: absolute;
  width: 100%;
  overflow: hidden;
  padding: 0 0 100px 0;
}

.container-order {
  height: 3.5rem;
  background: #ffffff;
  display: block;
  margin: 0.3rem 16px;
  font-size: 0.35rem;
  border-radius: 8px;

  .container-order-2 {
    width: 100%;
    margin: 0;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-evenly;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    div {
      width: 29%;
      padding: 0.7rem 0;
      border-radius: 8px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
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
      color: var(--deepgray);
    }

    p {
      font-size: 0.35rem;
      color: var(--middlegray);
    }
  }
}
</style>