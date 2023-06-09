<template>
  <div class="mydiary">
    <van-nav-bar title="详情页" left-arrow @click-left="$router.back()" />
    <div class="container">
      <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
      <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
      <van-card :desc="detail.initiator_id" :title="moodtype[detail.type]" thumb="https://img01.yzcdn.cn/vant/ipad.jpeg">
        <template #tags>
          <van-tag round type="primary">{{ detail.join_num }} / {{ detail.max_num }}</van-tag>
        </template>
      </van-card>
      <van-cell title="最终结果" icon="flag-o" style="font-weight: bold;background-color: transparent;" />
      <div class="rank" v-for="(challenger, index) in challengerList">
        <van-cell :key="challenger.participant_id">
          <span class="index">
            <i class="iconfont icon-ranking-list-fill">
              {{ index + 1 }}</i></span>
          <span class="name">{{ challenger.participant_name }}</span>
          <span class="score">{{ challenger.score }}</span>
        </van-cell>
      </div>
      <van-goods-action :v-if="show">
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
      challenge_id: this.$route.query.challenge_id,
      show: this.$route.query.show,
      status: null,
      detail: {},
      challengerList: [{
        challenge_id: 77777,
        identity: 0,
        participant_id: 123,
        participant_name: 'momo',
        score: 100
      },
      {
        challenge_id: 77777,
        identity: 0,
        participant_id: 123,
        participant_name: 'momo',
        score: 80
      }],

      chartColumn: null,

      headerLeftStatus: false,
      serverUrl: '',
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
      mydiarys: [],
      page: 1, // 标识翻页
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
    onClickButton() {
      if (this.status == true) {
        this.$router.push({ path: '/post', query: { postType: 2 ,challenge_id:this.challenge_id} });
      }
      this.$toast('点击按钮');
    },
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



  },
  mounted: function () {
    console.log(this.challenge_id);
    this.getMyChallenge();
  },
  watch: {
    '$route': 'getMyChallenge'
  }

};
</script>

<style lang="less" scoped>
.mydiary {
  width: 100%;
  height: 100vh;

  .container {
    width: 100%;
    height: 3.6rem;
    position: absolute;
  }
}

.rank {
  .index {
    width: 20%;
    color: orange;
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
</style>