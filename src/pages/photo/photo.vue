<template>
  <div class='home'>
    <!-- <svg @click="showComs()" t="1682595957005" class="icon" viewBox="0 0 1024 1024" version="1.1"
      xmlns="http://www.w3.org/2000/svg" p-id="5639" width="30" height="30">
      <path
        d="M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z"
        fill="#3D3D3D" p-id="5640"></path>
    </svg> -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <capture @refreshDataList="refreshDataList" />
      </swiper-slide>
      <swiper-slide v-for="(list, index) in frienddiarys" :key="index">
        <div class="card">
          <div class="title">
            <div class="bj-left">
              <img src="../../../static/img/avatar.jpg" alt="portrait">
            </div>
            <div class="bj-right">
              <span style="font-size: 0.4rem;font-weight: bold;">{{ list.user_id }}</span>
              <span style="font-size: 0.35rem;">{{ list.post_time }}</span>
            </div>
          </div>
          <div class="container">
            <img :src="list.picture==null?'../../../static/img/avatar.jpg':serverUrl+'/moodland/'+list.picture" alt="mood image" />
            <div class="content">
              <van-tag mark type="primary" size="large" :color="moodColor[list.emotion]">
                <i :class="moodIcon[list.emotion]" style = "font-size: 0.5rem;margin: 0 0.1rem;"></i>{{ list.emotion_strength }}
                
              </van-tag>
              <!-- <div class="moodtype">{{ moodtype[list.emotion] }}:{{ list.emotion_strength }}</div> -->
              <div class="container-con">{{ list.content }}</div>
            </div>
            <div class="comment">
              <div class="like_count">
                <svg t="1682596077441" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4807" width="30" height="30">
                  <path
                    d="M523.733333 841.024l33.173334-32.576 99.690666-97.813333c70.976-69.632 120.32-117.973333 138.709334-135.893334 59.008-57.514667 93.248-121.28 99.626666-184.234666 6.250667-61.44-15.488-119.744-61.589333-164.672-44.992-43.84-98.88-61.909333-157.034667-52.906667-49.365333 7.616-101.034667 34.624-150.016 78.848a21.333333 21.333333 0 0 1-28.586666 0c-48.981333-44.224-100.650667-71.232-150.016-78.869333-58.154667-8.96-112.042667 9.088-157.034667 52.928-46.101333 44.928-67.84 103.210667-61.610667 164.693333 6.4 62.933333 40.64 126.72 99.648 184.213333a100207.573333 100207.573333 0 0 1 145.92 142.826667l24.256 23.765333L512 852.522667l11.733333-11.498667z m-11.733333 11.52l-1.493333 1.429333A2.133333 2.133333 0 0 1 512 853.333333c0.512 0 1.045333 0.213333 1.493333 0.64l-1.493333-1.450666z m157.781333-721.792c71.637333-11.093333 138.901333 11.477333 193.344 64.533333 55.317333 53.930667 81.834667 124.992 74.282667 199.530667-7.466667 73.642667-46.549333 146.368-112.32 210.474667-18.346667 17.898667-67.669333 66.218667-138.453333 135.637333-31.829333 31.232-65.706667 64.448-99.84 97.984L553.6 871.466667l-13.184 12.949333a40.554667 40.554667 0 0 1-56.832 0l-114.602667-112.64-24.213333-23.722667a677626.346667 677626.346667 0 0 0-145.856-142.762666C133.141333 541.184 94.08 468.48 86.613333 394.816c-7.552-74.538667 18.944-145.6 74.282667-199.530667 54.442667-53.056 121.706667-75.605333 193.344-64.533333 53.162667 8.213333 107.093333 34.688 157.781333 76.949333 50.709333-42.24 104.618667-68.736 157.781334-76.949333z"
                    fill="#3D3D3D" p-id="4808"></path>
                </svg>
                <p>{{ list.likeCount }}</p>
                <svg @click="showComs()" t="1682595957005" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5639" width="30" height="30">
                  <path
                    d="M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z"
                    fill="#3D3D3D" p-id="5640"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <van-popup v-model="showComment" round position="bottom" :style="{ height: '500px' }">
      <comment :showComment="showComment" :comments="commentData" @change="costPlannedAmountChange">
      </comment>
    </van-popup>
    <v-footer></v-footer>
  </div>
</template>
<script>
import { getData } from '@/api/data'
import footer from "@/components/footer/index";
import axios from "axios";
import * as CommentData from '@/api/mockdata';
import comment from '@/components/comment/comment';
import capture from '@/components/capture/capture';
import { getComment } from '../../api/api';
export default {
  name: "index",
  data() {
    return {
      commentData: [],
      serverUrl:'',
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgust", "Happiness", "Sadness", "Anger", "Neutral"],
      moodColor:['rgb(255,150,178)','rgb(75,167,133)','rgb(122,162,255)','rgb(255,202,43)','rgb(28,196,233)','rgb(243,109,66)','rgb(124,225,0)'],
      moodIcon:['iconfont icon-surprise','iconfont icon-ghost-fill','iconfont icon-confused2','iconfont icon-happy-face','iconfont icon-sad-f','iconfont icon-angry2','iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
      frienddiarys: [],
      swiperOptions: {
        direction: 'vertical', // 滑动方向
        grabCursor: true, // 小手掌抓取滑动
        setWrapperSize: true,
        autoHeight: true, // 当autoHeight为启用状态，设置更新swiper高度的时间。
        slidesPerView: 1, // 设置slider容器能够同时显示的slides数量(carousel模式)。
        mousewheel: true, // 开启鼠标滚轮控制Swiper切换。可设置鼠标选项，或true使用默认值。
        mousewheelControl: true,
        height: window.innerHeight - 70,
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
    // 获取点赞列表
    // async friendDiary() {
    //   const config = {
    //     headers: {
    //       'Content-type': "application/json"
    //     }
    //   }
    //   let self = this;
    //   let user_id = localStorage.getItem('user').user_id;
    //   // 先用我的日志替代一下
    //   axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + user_id + '/my', config).then(function (response) {
    //     //成功时服务器返回 response 数据
    //     self.frienddiarys = response.data;
    //     console.log("resfrienddiarys ", self.frienddiarys);
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // },
    // 获取好友日志
    async friendDiary() {
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      let self = this;
      let user_id = JSON.parse(localStorage.getItem('user')).user_id;
      console.log(user_id);
      self.serverUrl = process.env.VUE_APP_SERVER_URL;
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + 123456 + '/friend', config).then(function (response) {
        //成功时服务器返回 response 数据
        self.frienddiarys = response.data;
        console.log("resfrienddiarys ", self.frienddiarys);
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


  },
  mounted() {
    this.friendDiary();
    this.thisCommentData();
  },
  components: {
    "v-footer": footer,
    comment,
    capture
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
  background-color: rgba(255,255,255,0.6);
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
  float: left;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  span {
    font-weight: 100;
    font-size: 16px;
  }
}

.container{
  img{
    width: 100%;
  }
  .content{
    .container-con{
      margin:0.3rem;
      font-size:0.4rem;
    }
  }

  .comment{
    display: flex;
    justify-content: flex-end;
    margin-right:0.3rem;
    margin-bottom:0.3rem;
    .like_count{
      display: flex;
      width: 1.8rem;
      justify-content: space-between;
    }
  }
}
</style>
