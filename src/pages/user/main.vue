<template>
  <div class="user">
    <!-- <v-header title="个人中心" :headerLeftStatus="headerLeftStatus" /> -->
    <div class="container">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="user.avatar" alt="用户avatar">
          <!-- `http://10.128.245.71:5000/moodland/${user.avatar}` -->
        </div>
        <div class="bj-right">
          <span>{{ user.user_name }}</span>
        </div>
      </div>

      <div class="container-order">
        <div class="container-order-2">
          
          <p v-for="list in container" @click="jumpToOthers(list.link)">
            <van-badge :style="list.name ==='消息通知' && noticeNum>0 ?'visibility:visible':'visibility:hidden'" :content="noticeNum" max="99" color="orange">
            <i :class="list.class" :style = "list.style"></i>
            </van-badge>
            <span>{{ list.name }}</span>
            
          </p>
          
        </div>
      </div>
      <div>
        <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
        <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
        <van-cell-group inset>
          <van-cell title="我的心情" is-link to="mydiary" icon="calendar-o"  style="font-weight: bold;" />
          <calendar-heatmap tooltip-unit="" :end-date="date" :values="timeValue" :vertical="false" :range-color="colors" :max="28" style="margin:0.3rem 0"/>
        </van-cell-group>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import axios from "axios";
import router from '../../router';
import { CalendarHeatmap } from "vue-calendar-heatmap";
// import { CalendarHeatmap } from "vue-calendar-heatmap";
import * as echarts from "echarts";
import { type } from 'os';
export default {
  data() {
    return {
      date:"",
      noticeNum:0,
      container: [
        {
          class: "iconfont icon--",
          name: "我的好友",
          link:"/friend",
          style:"font-size:0.8rem;color:var(--mygreen);visibility:visible"
        },
        {
          class:"iconfont icon-haoyoutixing",
          name: "消息通知",
          link:"/notice",
          style:"font-size:0.9rem;color:var(--mygreen);visibility:visible"
        },
        {
          class: "iconfont icon-shezhi1",
          name: "个人设置",
          link:"/setting",
          style:"font-size:0.8rem;color:var(--mygreen);visibility:visible"
        },
      ],
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
      user: JSON.parse(localStorage.getItem("user")),
      headerLeftStatus: false
    };
  },
  components: {
    "v-header": header,
    "v-footer": footer,
    CalendarHeatmap,
    // CalendarHeatmap
  },
  methods: {
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate =
        year +
        "-" +
        dateArr[0] +
        "-" +
        dateArr[1] 
      //此处可以拿外部的变量接收，也可直接返回  strDate:2022-05-01 13:25:30
      this.date = strDate;
    },
    searchInfoData() {
      let self = this;
      console.log(self.user.user_id)
      // `http://10.128.245.71:5000/moodland/${user.avatar}`
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/user/user/${self.user.user_id}`).then(function (response) {
        self.user = response.data;
        console.log("self.user.avatar:",self.user.avatar);
        // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
        if(response.data.avatar===null){
          self.user.avatar=JSON.parse(localStorage.getItem("user")).avatar
        }else{
          self.user.avatar=process.env.VUE_APP_SERVER_URL+`/moodland/${response.data.avatar}`;
        }
        // 并将user的新数据保存
        localStorage.setItem("user", JSON.stringify(self.user))
      }).catch(function (error) {
        self.user.avatar=process.env.VUE_APP_SERVER_URL+'/moodland/vue'+'/img/avatar.svg';
        console.log(error);
      });
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
          var add = Math.ceil(item.emotion_strength/20)-2
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
    searchNotice(){
      let self = this
      axios.get(process.env.VUE_APP_SERVER_URL+`/moodland/notice/${self.user.user_id}/my/unread`).then(function (response) {
        //成功时服务器返回 response 数据
        var res = response.data
        console.log(res)
        if(typeof(res)=="number"){
          self.noticeNum = res
        }

      }).catch(function (error) {
        console.log(error);
      });
    },
    jumpToOthers(link) {
      router.push(link);
    }
    
  },
  mounted: function () {
    this.currentTime();
    this.searchInfoData();
    this.searchNotice();
    this.searchMoodData();
  },
  watch: {
    '$route':'searchInfoData'
  }

};
</script>


<style lang="less" scoped>
.user {
  width: 100%;
  height: 100vh;


  .container {
    width: 100%;
    height: 3.6rem;
    position: absolute;
    top: 1.1rem;

    .container-bj {
      width: 100%;
      height: 100%;

      .bj-left {
        width: 36%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 60%;
          height: 60%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .bj-right {
        width: 60%;
        height: 100%;
        float: left;
        display: flex;
        justify-content: center;
        flex-direction: column;

        span {
          font-weight: bold;
        }
      }

      img {
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50%;
      }

      span {
        color: #000000;
        font-size: 0.6rem;
      }

      p {
        font-size: 0.35rem;
        color: #ffffff;
      }
    }

    .container-integral {
      width: 100%;
      height: 2rem;
      background: #ffffff;
      display: flex;
      justify-content: center;

      p {
        width: 33%;
        height: 100%;
        font-size: 0.36rem;
        line-height: 0.6rem;
        font-weight: 500;
        float: left;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
      }
    }

    .container-con {
      background: #ffffff;

      a {
        width: 90%;
        height: 1.5rem;
        display: flex;
        justify-content: space-between;
        margin: auto;

        .con-left {
          width: 80%;
          height: 100%;
          display: flex;
          align-items: center;

          i {
            font-size: 0.5rem;
            margin-right: 0.2rem;
          }

          span {
            font-size: 0.4rem;
            padding-left: 0.1rem;
          }
        }

        .con-rigth {
          width: 10%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;

          i {
            font-size: 0.5rem;
          }
        }
      }
    }

    .container-order {
      width: 90%;
      height: 2.5rem;
      background: rgb(255, 255, 255);
      display: block;
      margin: 0.3rem auto;
      font-size: 0.35rem;
      border-radius: 8px;

      .container-order-1 {
        width: 100%;
        height: 1.5rem;

        .left {
          float: left;
          display: block;
          line-height: 1.5rem;
          margin-left: 0.5rem;
          font-size: 0.4rem;
        }

        .right {
          float: right;
          line-height: 1.5rem;
          margin-right: 0.6rem;
          font-size: 0.4rem;
        }
      }

      .container-order-2 {
        width: 100%;
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        p {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            width: 0.8rem;
            height: 0.8rem;
            margin: auto;
          }

          span {
            text-align: center;
            padding-top: 0.3rem;
          }
          .message{
            position:absolute;
            left:50%;
          }
        }
      }
    }
  }
}
</style>