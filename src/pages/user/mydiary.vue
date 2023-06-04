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
        <card :list="list"></card>
      </swiper-slide>
    </swiper>

    </div>
  </template>

<script>
import card from '@/components/card/card'
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
        // { date: "2023-03-26", count: 21 },
        // { date: "2023-03-27", count: 22 },
        // { date: "2023-03-28", count: 23 },
        // { date: "2023-03-31", count: 24 },
        // { date: "2023-04-03", count: 25 },
        // { date: "2023-04-04", count: 26 },
        // { date: "2023-04-07", count: 27 },
        // { date: "2023-04-10", count: 28 },
        // { date: "2023-04-11", count: 0 },
        // { date: "2023-04-14", count: 1 },
        // { date: "2023-04-17", count: 2 },
        // { date: "2023-04-18", count: 3 },
        // { date: "2023-04-21", count: 4 },
        // { date: "2023-04-24", count: 5 },
        // { date: "2023-04-25", count: 6 },
        // { date: "2023-04-28", count: 7 },
        // { date: "2023-05-01", count: 8 },
        // { date: "2023-05-02", count: 9 },
        // { date: "2023-05-05", count: 10 },
        // { date: "2023-05-08", count: 11 },
        // { date: "2023-05-09", count: 12 },
        // { date: "2023-05-12", count: 13 },
        // { date: "2023-05-15", count: 14 },
        // { date: "2023-05-16", count: 15 },
        // { date: "2023-05-17", count: 16 },
        // { date: "2023-05-18", count: 17 },
        // { date: "2023-05-19", count: 18 },
        // { date: "2023-05-20", count: 19 },
        // { date: "2023-05-21", count: 20 },
      ],
      headerLeftStatus: false,
      commentData: [],
      serverUrl:'',
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
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
    comment,
    card,
    CalendarHeatmap,
    // CalendarHeatmap
  },
  methods: {
    searchInfoData() {
      let self = this;
      console.log(self.user.user_id)
      // `http://10.128.245.71:5000/moodland/${user.avatar}`
      axios.get(process.env.VUE_APP_SERVER_URL +`/moodland/user/user/${self.user.user_id}`).then(function (response) {
        //成功时服务器返回 response 数据
        self.user = response.data;
        console.log(self.user);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
        if(response.data.avatar===""){
          self.user.avatar=localStorage.getItem("user").avatar;
        }else{
          self.user.avatar=process.env.VUE_APP_SERVER_URL +`/moodland/${self.user.avatar}`;
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
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + self.user.user_id + '/my', config).then(function (response) {
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

    searchMoodData() {
      let self = this;
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/diary/${self.user.user_id}/mood`).then(function (response) {
        //成功时服务器返回 response 数据
        var res = response.data
        console.log(res)
        self.timeValue =[]
        for(var i =0;i<res.length;i++) {
          var item = res[i]
          var timev = {}
          timev.date=item.post_time.split(" ")[0]
          var add = Math.floor(item.emotion_strength/20)-2
          if(add<0){
            add = 0
          }
          timev.count = item.emotion * 4 + add + 1
          timev.diary_id = item.diary_id
          self.timeValue.push(timev)
        }
        console.log(self.timeValue)
        // console.log("localStorage",localStorage.getItem("user"))
      }).catch(function (error) {
        console.log(error);
      });
    },
    

    jumpToOthers(link) {
      router.push(link);
    }
    
  },
  mounted: function () {
    
    this.searchInfoData();
    this.myDiary();
    this.searchMoodData();
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

</style>