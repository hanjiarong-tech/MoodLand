<template>
  <div class="mydiary">
    <van-nav-bar title="详情页" left-arrow @click-left="$router.back()" safe-area-inset-top />
    <!-- <div :class="'pure_top '+moodtype[detail.type]">
    </div> -->
    <img class="bgImg" :src="'../../static/scene/' + detail.type + '.svg'">
    <div class="container">
      <div class="bg">
        <div class="bj-right">
          <p class="title" style="font-size:28px;font-weight: bold;">{{ this.challenge_id ? moodtype[detail.type] + '挑战' :
            gameType[detail.type_id - 1] + '游戏'
          }}</p>
          <div class="tip">
            <van-cell :border=false>
              <span class="tip_title">
                发起人</span>
              <span class="tip_content">{{ detail.initiator_name }}</span>
            </van-cell>
            <van-cell :border=false>
              <span class="tip_title">
                截止时间</span>
              <span class="tip_content">{{ detail.end_time }}</span>
            </van-cell>
          </div>
        </div>
        <div :v-if="detail.max_num != null" class="bj-action">
          <van-tag :color="detail.join_num / detail.max_num > 0.6 ? `orange` : `var(--light-yellow)`"
            :text-color="detail.join_num / detail.max_num > 0.6 ? `white` : `orange`" style="width: 120px;
    height: 60px;text-align: center;" round type="primary" size="large">{{
      detail.join_num }} / {{ detail.max_num }}</van-tag>
        </div>
      </div>
      <van-divider />
      <van-cell title="最终结果" icon="flag-o" style="font-weight: bold;background-color: transparent;" />
      <van-collapse v-model="activeName" accordion>
      <div class="rank" v-for="(challenger, index) in challengerList">

      
        <van-collapse-item :key="challenger.participant_id">
          <template #title>
          <span class="index">
            <i :class="index < 1 ? 'iconfont icon-ranking-list-fill' : ''">
            </i><span>{{ index + 1 }}</span>
          </span>
          <span class="name">{{ challenger.participant_name }}</span>
          <span class="score">{{ challenger.score }}</span>
          </template>
          <img :src="serverUrl+'/moodland/'+challenger.picture"/>
        </van-collapse-item>
      
      </div>
    </van-collapse>
      <!-- :style="$route.matched[0].path=='/explore' ? 'color: var(--theme-color) ': 'color: var(--mydarkblue)'" -->
      <van-goods-action v-if="show === 'true'">
        <!-- <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" /> -->
        <!-- <van-goods-action-button :v-if="status==true" color=var(--mydarkblue) type="danger" text="参加挑战" @click="onClickButton" /> -->
        <van-goods-action-button color=var(--mydarkblue) :disabled="!status" type="danger"
          :text="status == false ? '人数已满，无法参加' : '参加'" @click="onClickButton" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import filePopup from '@/components/filePopup/filePopup'
import comment from '@/components/comment/comment';
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      // 挑战
      serverUrl: process.env.VUE_APP_SERVER_URL,
      challenge_id: this.$route.query.challenge_id,
      show: this.$route.query.show,
      status: null,
      detail: {},
      color: {},
      challengerList: [],
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
      // 游戏
      game_id: this.$route.query.game_id,
      gameType: [],
      activeName:0,
    };
  },
  components: {
    "v-header": header,
    "v-footer": footer,
    comment,
    CalendarHeatmap,
    // CalendarHeatmap
  },
  methods: {
    // 参与活动
    // onClickIcon() {
    //   Toast('点击图标');
    // },
    // 游戏类型
    initGameType() {
      let self = this;
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/game/type`).then(function (response) {
        console.log("123:", response.data)
        for (let i = 0; i < response.data.length; i++) {
          self.gameType.push(response.data[i].game_name)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    onClickButton() {
      if (this.status == true) {
        this.$router.push({ path: '/post', query: { postType: 2, challenge_id: this.challenge_id,challenge_type:this.detail.type } });
      }
      this.$toast('点击按钮');
    },
    // 查看挑战详情
    getMyChallenge() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}/${self.challenge_id}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        if (self.detail.join_num < self.detail.max_num) {
          self.status = true;
          console.log('>>>>' + self.status)
        } else {
          self.status = false;
          console.log('>>>>' + self.status)
        }
        console.log(response.data);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取得分结果
    getScore() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/scoreRange/${self.challenge_id}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.challengerList = response.data;
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 查看游戏详情
    getMyGame() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/game/${self.user.user_id}/${self.game_id}`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        if (self.detail.join_num < self.detail.max_num) {
          self.status = true;
          console.log('>>>>' + self.status)
        } else {
          self.status = false;
          console.log('>>>>' + self.status)
        }
        console.log(response.data);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
      }).catch(function (error) {
        console.log(error);
      });
    },

  },
  mounted: function () {
    this.initGameType();
    if (this.challenge_id) {
      this.getMyChallenge();
      this.getScore();
    }
    if (this.game_id) {
      this.getMyGame();
    }

  },

};
</script>

<style lang="less" scoped>
.mydiary {
  width: 100%;
  height: 100vh;
  background-color: white;

  .bgImg {
    z-index: 0;
    position: fixed;
    width: 100vw;
    height: 100vw;
    top: -20vw;
  }

  .container {
    width: 100%;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    top: 15%;
    padding: 20px 20px 60px 20px;
    box-shadow: 0px -2px 5px #9191912e;

    .bg {
      width: 100%;
      height: 150px;
    }



    .bj-right {
      width: 80%;
      height: 100%;
      float: left;
      padding: 0.1rem;

      .title {
        margin: 0 0 20px 0;
        bottom: 10px;

      }

      p {
        font-size: 12px;
        margin: 10px 0;
        color: rgba(0, 0, 0, 0.573);
      }
    }

    .bj-action {
      float: right;
      height: 100%;
      width: 19%;
      align-content: center;
      position: relative;
      align-items: center;
      top: -30px;
      justify-content: center;
    }

  }
}

.van-tag--round {
  border-radius: 15px;
}

.van-tag--large {
  padding: 10px 20px 2px;
  font-size: 18px;
}

.tip {
  width: 100vw;

  .tip_title {
    width: 30%;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.501);
  }

  .tip_content {
    width: 70%;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.763);
  }

}

.rank {
  span {
    font-size: 16px;
  }

  .index {
    width: 12%;
    color: orange;
    text-align: end;
    margin: 0 10px 0 0;
  }

  .name {
    width: 20%;
  }

  .score {
    width: 60%;
    text-align: right;
  }
}

/deep/ .van-cell__value {
  display: flex;
}
/deep/ .van-cell__title, .van-cell__value {
  display: flex;
}
</style>