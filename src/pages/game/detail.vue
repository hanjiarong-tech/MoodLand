<template>
  <div class="mydiary">
    <van-nav-bar title="详情页" left-arrow @click-left="$router.back()" safe-area-inset-top/>

        <div class = "container">
        <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
        <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
          <van-card
            :desc="detail.initiator_id"
            :title="moodtype[detail.type]"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
          >
            <template #tags>
              <van-tag round type="primary">{{detail.join_num}} / {{detail.max_num}}</van-tag>
            </template>
          </van-card>
          <div class = "rank" v-for="(challenger,index) in challengerList">
            <van-cell :key="challenger.participant_id">
              <span class="index">
                <i class="iconfont icon-ranking-list-fill">
                {{index+1}}</i></span>
              <span class = "name">{{challenger.participant_name}}</span>
              <span class = "score">{{challenger.score}}</span>
              </van-cell>
          </div>
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
    challenge_id:this.$route.query.challenge_id,
    detail:{},
    challengerList:[{
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
    involved:this.$route.query.involved,
    headerLeftStatus: false,
    commentData: [],
    serverUrl:'',
    showComment: false,
    moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
    moodColor:['rgb(255,150,178)','rgb(75,167,133)','rgb(122,162,255)','rgb(255,202,43)','rgb(28,196,233)','rgb(243,109,66)','rgb(124,225,0)'],
    moodIcon:['iconfont icon-surprise','iconfont icon-ghost-fill','iconfont icon-confused2','iconfont icon-happy-face','iconfont icon-sad-f','iconfont icon-angry2','iconfont icon-neutral-face'],
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
  getMyChallenge() {
      let self = this;
      console.log(self.user.user_id)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      // `http://10.128.245.71:5000/moodland/${user.avatar}`
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/social/challenge/${self.user.user_id}/${self.challenge_id}`,config).then(function (response) {
        //成功时服务器返回 response 数据
        self.detail = response.data;
        console.log(response.data);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径

      }).catch(function (error) {
        console.log(error);
      });
    },

  refreshDataList(imgSrc) {
    // 这里返回服务器图片的地址
    console.log(imgSrc)
  },
  // 获取我的日志
  async myDiary() {
    const config = {
      headers: {
        'Content-type': "application/json"
      }
    }
    let self = this;
    let user_id = JSON.parse(localStorage.getItem('user')).user_id;
    console.log(user_id);
    self.serverUrl = process.env.VUE_APP_SERVER_URL;
    axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + 123456 + '/my', config).then(function (response) {
      //成功时服务器返回 response 数据
      self.mydiarys = response.data;
      console.log("resmydiarys ", self.mydiarys);
    }).catch(function (error) {
      console.log(error);
    });
  },
  // 获取评论列表
  async thisCommentData() {
    // 从后端获取
    // getComment().then((value) => {
    //   const { data } = value;
    //   this.commentData = data;
    // });
    // getComment().then((value) => {
    //   const { data } = value;
    //   this.commentData = data;
    // });
    const config = {
      headers: {
        'Content-type': "application/json"
      }
    }
    let self = this;
    console.log('AXIOS_ENV-------' + process.env.VUE_APP_SERVER_URL)
    axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/123/123/comment', config).then(function (response) {
      //成功时服务器返回 response 数据
      self.commentData = response.data;
      console.log("res ", self.commentData);
    }).catch(function (error) {
      console.log(error);
    });
  },
  showComs() {
    this.showComment = true;
  },
  // 获取mock数据
  getData() {
    this.commentData = CommentData.comment.data;
  },
  // 关闭评论
  async costPlannedAmountChange(param1) {
    this.showComment = param1;
  },

  jumpToOthers(link) {
    router.push(link);
  }
  
},
mounted: function () {
  console.log(this.challenge_id);
  this.myDiary();
  this.getMyChallenge();
},
watch: {
  '$route':'getMyChallenge'
}

};
</script>

<style lang="less" scoped>

.mydiary {
width: 100%;
height: 100vh;

.container{
  width: 100%;
  height: 3.6rem;
  position: absolute;
}
}
.rank{
  .index{
    width: 20%;
    color: orange;
  }
  .name{
    width:20%;
  }
  .score{
    width: 60%;
    text-align:right;
  }
}

/deep/ .van-cell__value{
  display:flex;
}


</style>