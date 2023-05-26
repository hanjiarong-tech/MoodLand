<template>
  <div class='home'>
    <swiper :options="swiperOptions">
      <swiper-slide @mousemove.stop style="height: calc(100vh - 60px);">
        <capture @refreshDataList="refreshDataList" />
        <div  style="justify-content: center;display:flex;bottom:2rem">
          <i>查看好友的心情↓</i>
        </div>
      </swiper-slide>
      <swiper-slide v-for="(list, index) in frienddiarys" :key="index">
        <card :list="list" ></card>
      </swiper-slide>
    </swiper>
    <!-- <van-popup v-model="showComment" round :style="{ height: '500px' }">
      <comment :showComment="showComment" :comments="commentData" @change="costPlannedAmountChange">
      </comment>
    </van-popup> -->
    <v-footer></v-footer>
  </div>
</template>
<script>
import card from '@/components/card/card'
import { getData } from '@/api/data'
import footer from "@/components/footer/index";
import axios from "axios";
import * as CommentData from '@/api/mockdata';
import comment from '@/components/comment/comment';
import like from '@/components/like/like'
import capture from '@/components/capture/capture';
import { getComment } from '../../api/api';
export default {
  name: "index",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      commentData: [],
      friendlikes: [],
      serverUrl: '',
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
      frienddiarys: [],
      swiperOptions: {
        noSwiping:true,
        noSwipingClass:"ss",
        touchMoveStopPropagation:true,
        direction: 'vertical', // 滑动方向
        grabCursor: false, // 小手掌抓取滑动
        setWrapperSize: true,
        autoHeight: true, // 当autoHeight为启用状态，设置更新swiper高度的时间。
        slidesPerView: 1, // 设置slider容器能够同时显示的slides数量(carousel模式)。
        mousewheel: true, // 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
        mousewheelControl: true,
        height: window.innerHeight - 60,
        resistanceRatio: 0, // 抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。
        observeParents: true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
        on: {
          // 上滑
          slidePrevTransitionStart: () => {
            if (this.page > 1) {
              this.page -= 1;
            }
          },
          // 下滑动
          slideNextTransitionStart: () => {
            this.page += 1;
          },
        },
      },
      page: 1, // 标识翻页
    };
  },
  methods: {
    refreshDataList(imgSrc) {
      // 这里返回服务器图片的地址
      console.log(imgSrc)
    },
    // 获取点赞头像列表
    async likeAmount(param1) {
      this.friendlikes = param1;

    },
    // 获取好友日志
    async friendDiary() {
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      let self = this;
      self.serverUrl = process.env.VUE_APP_SERVER_URL;
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + self.user.user_id + '/friend', config).then(function (response) {
        //成功时服务器返回 response 数据
        self.frienddiarys = response.data;
        console.log("resfrienddiarys ", self.frienddiarys);
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取评论列表
    async thisCommentData(diaryid) {
      this.showComment = true;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      let self = this;
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}/${diaryid}/comment`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.commentData = response.data;
        console.log("res ", self.commentData);
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 获取mock数据
    getData() {
      this.commentData = CommentData.comment.data;
    },
    // 关闭评论
    async costPlannedAmountChange(param1) {
      this.showComment = param1;
    },


  },
  // watch: {
  //   showComment: function (newVal) {
  //     console.log('11111111', newVal)
  //   }
  // },
  mounted() {
    this.friendDiary();
  },
  components: {
    "v-footer": footer,
    comment,
    capture,
    like,
    card
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
}

.card {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 10px;
}

.title {
  height: 15%;
  margin: 0.3rem;
}


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
    border-radius: 50%;
  }
}

.bj-right {
  width: 60%;
  height: 100%;
  padding: 0.3rem 0;
  float: left;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  span {
    font-weight: 100;
    font-size: 16px;
  }
}

.container {
  img {
    width: 100%;
  }

  .portrait {
    width: 100%;
    height: 30px;
    margin: 0 5px;

    img {
      width: 30px;
      border-radius: 50%;
    }
  }

  .content {
    .container-con {
      margin: 0.3rem;
      font-size: 0.4rem;
    }
  }

  .comment {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;

    .like_count {
      display: flex;
      width: 1.8rem;
      justify-content: space-between;
    }
  }
}
</style>
