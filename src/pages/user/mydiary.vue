<template>
    <div class="mydiary">
      <van-nav-bar title="我的心情" left-arrow @click-left="$router.back()" />
      <swiper :options="swiperOptions">
        <swiper-slide>
          <div class = "container">
          <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
          <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
          <van-cell-group inset>
            <van-cell title="我的心情" is-link to="mydiary" icon="calendar-o"  style="font-weight: bold;" />
            <calendar-heatmap tooltip-unit="" end-date="2023-05-22" :values="timeValue" :vertical="false" :range-color="colors" :max="28" style="margin:0.3rem 0"/>
          </van-cell-group>
      </div>
    </swiper-slide>
      <swiper-slide v-for="(list, index) in mydiarys" :key="index">
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
          <div class="container-pic">
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

    </div>
  </template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import comment from '@/components/comment/comment';
import filePopup from '@/components/filePopup/filePopup'
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      chartColumn: null,
      colors: ['#ebedf0',
        'rgba(255,150,178,0.4)',
        'rgba(255,150,178,0.6)',
        'rgba(255,150,178,0.8)',
        'rgba(255,150,178,1)',//surprise 4
        'rgba(75,167,133,0.4)',
        'rgba(75,167,133,0.6)',
        'rgba(75,167,133,0.8)',
        'rgba(75,167,133,1)',//fear 8
        'rgba(122,162,255,0.4)',
        'rgba(122,162,255,0.6)',
        'rgba(122,162,255,0.8)',
        'rgba(122,162,255,1.0)',//disgust 12
        'rgba(255,202,43,0.4)',
        'rgba(255,202,43,0.6)',
        'rgba(255,202,43,0.8)',
        'rgba(255,202,43,1.0)',//happiness 16
        'rgba(28,196,233,0.4)',
        'rgba(28,196,233,0.6)',
        'rgba(28,196,233,0.8)',
        'rgba(28,196,233,1.0)',//sadness 20
        'rgba(243,109,66,0.4)',
        'rgba(243,109,66,0.6)',
        'rgba(243,109,66,0.8)',
        'rgba(243,109,66,1.0)',//anger 24
        'rgba(124,225,0,0.4)',
        'rgba(124,225,0,0.6)',
        'rgba(124,225,0,0.8)',
        'rgba(124,225,0,1.0)',//netural 28
        
        
      ],
      timeValue: [
        { date: "2020-08-02", count: 6 },
        { date: "2020-08-03", count: 6 },
        { date: "2020-08-04", count: 6 },
        { date: "2020-08-05", count: 6 },
        { date: "2020-08-06", count: 6 },
        { date: "2020-08-07", count: 6 },
        { date: "2020-08-08", count: 6 },
        { date: "2020-08-15", count: 6 },
        { date: "2020-08-22", count: 6 },
        { date: "2020-08-29", count: 6 },
        { date: "2020-09-05", count: 6 },
        { date: "2020-09-28", count: 6 },
        { date: "2020-09-22", count: 6 },
        { date: "2020-09-23", count: 6 },
        { date: "2020-09-24", count: 6 },
        { date: "2020-10-04", count: 6 },
        { date: "2020-10-02", count: 6 },
        { date: "2020-10-10", count: 6 },
        { date: "2020-10-11", count: 6 },
        { date: "2020-10-17", count: 6 },
        { date: "2020-10-19", count: 6 },
        { date: "2020-10-23", count: 6 },
        { date: "2020-10-27", count: 6 },
        { date: "2020-10-28", count: 6 },
        { date: "2020-10-29", count: 6 },
        { date: "2020-11-22", count: 6 },
        { date: "2020-11-30", count: 6 },
        { date: "2020-12-08", count: 6 },
        { date: "2020-12-16", count: 6 },
        { date: "2020-12-24", count: 6 },
        { date: "2021-01-01", count: 6 },
        { date: "2021-01-09", count: 6 },
        { date: "2021-01-16", count: 6 },
        { date: "2021-01-22", count: 6 },
        { date: "2021-01-28", count: 6 },
        { date: "2021-02-03", count: 6 },
        { date: "2021-02-09", count: 6 },
        { date: "2021-02-15", count: 6 },
        { date: "2021-02-21", count: 6 },
        { date: "2021-03-21", count: 6 },
        { date: "2021-03-22", count: 6 },
        { date: "2021-03-23", count: 6 },
        { date: "2021-03-24", count: 6 },
        { date: "2021-03-25", count: 6 },
        { date: "2023-03-26", count: 21 },
        { date: "2023-03-27", count: 22 },
        { date: "2023-03-28", count: 23 },
        { date: "2023-03-31", count: 24 },
        { date: "2023-04-03", count: 25 },
        { date: "2023-04-04", count: 26 },
        { date: "2023-04-07", count: 27 },
        { date: "2023-04-10", count: 28 },
        { date: "2023-04-11", count: 0 },
        { date: "2023-04-14", count: 1 },
        { date: "2023-04-17", count: 2 },
        { date: "2023-04-18", count: 3 },
        { date: "2023-04-21", count: 4 },
        { date: "2023-04-24", count: 5 },
        { date: "2023-04-25", count: 6 },
        { date: "2023-04-28", count: 7 },
        { date: "2023-05-01", count: 8 },
        { date: "2023-05-02", count: 9 },
        { date: "2023-05-05", count: 10 },
        { date: "2023-05-08", count: 11 },
        { date: "2023-05-09", count: 12 },
        { date: "2023-05-12", count: 13 },
        { date: "2023-05-15", count: 14 },
        { date: "2023-05-16", count: 15 },
        { date: "2023-05-17", count: 16 },
        { date: "2023-05-18", count: 17 },
        { date: "2023-05-19", count: 18 },
        { date: "2023-05-20", count: 19 },
        { date: "2023-05-21", count: 20 },
      ],
      headerLeftStatus: false,
      commentData: [],
      serverUrl:'',
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgust", "Happiness", "Sadness", "Anger", "Neutral"],
      moodColor:['rgb(255,150,178)','rgb(75,167,133)','rgb(122,162,255)','rgb(255,202,43)','rgb(28,196,233)','rgb(243,109,66)','rgb(124,225,0)'],
      moodIcon:['iconfont icon-surprise','iconfont icon-ghost-fill','iconfont icon-confused2','iconfont icon-happy-face','iconfont icon-sad-f','iconfont icon-angry2','iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
      mydiarys: [],
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
  components: {
    "v-header": header,
    "v-footer": footer,
    CalendarHeatmap,
    // CalendarHeatmap
  },
  methods: {
    searchInfoData() {
      let self = this;
      console.log(self.user.user_id)
      // `http://10.128.245.71:5000/moodland/${user.avatar}`
      axios.get(`http://10.128.245.71:5000/moodland/user/user/${self.user.user_id}`).then(function (response) {
        //成功时服务器返回 response 数据
        self.user = response.data;
        console.log(self.user);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
        if(response.data.avatar===""){
          self.user.avatar=localStorage.getItem("user").avatar;
        }else{
          self.user.avatar=`http://10.128.245.71:5000/moodland/${self.user.avatar}`;
        }
        // 并将user的新数据保存
        localStorage.setItem("user", JSON.stringify(self.user))
        console.log("response.data",response.data)
        // console.log("localStorage",localStorage.getItem("user"))
      }).catch(function (error) {
        console.log(error);
      });
    },
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
    //     self.mydiarys = response.data;
    //     console.log("resmydiarys ", self.mydiarys);
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    // },
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
    this.myDiary();
    this.searchInfoData();
  },
  watch: {
    '$route':'searchInfoData'
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
    top: 1rem;
  }
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

.container-pic{
  

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