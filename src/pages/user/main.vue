<template>
  <div class="user">
    <v-header title="个人中心" :headerLeftStatus="headerLeftStatus" />
    <div class="container">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="`http://10.128.211.2:5000/moodland/${user.avatar}`" alt="用户头像">
        </div>
        <div class="bj-right">
          <span>{{ user.user_name }}</span>
        </div>
      </div>

      <div class="container-order">
        <div class="container-order-2">
          <p @click="jumpToOthers('/friend')">
            <img src="/static/img/111.png">
            <span>我的好友</span>
          </p>
          <p @click="jumpToOthers('/notice')">
            <van-badge :content="200" max="99" class="message"/>
              <img src="/static/img/222.png">
            <span>消息通知</span>
          </p>
          <p @click="jumpToOthers('/setting')">
            <img src="/static/img/333.png">
            <span>个人设置</span>
          </p>
        </div>
      </div>
      <div>
        <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
        <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
        <calendar-heatmap end-date="2023-05-16" :values="timeValue" :vertical="false" :range-color="colors" :max="10" :tooltip="true"/>
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
export default {
  data() {
    return {
      chartColumn: null,
      colors: ['#ebedf0',
        'rgba(255,202,43,0.4)',
        'rgba(255,202,43,0.6)',
        'rgba(255,202,43,0.8)',
        'rgba(255,202,43,1.0)',],
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
        { date: "2021-03-26", count: 6 },
        { date: "2021-03-27", count: 6 },
        { date: "2021-03-28", count: 6 },
        { date: "2021-03-31", count: 6 },
        { date: "2021-04-03", count: 6 },
        { date: "2021-04-07", count: 6 },
        { date: "2021-04-04", count: 6 },
        { date: "2021-04-10", count: 6 },
        { date: "2021-04-11", count: 6 },
        { date: "2021-04-14", count: 6 },
        { date: "2021-04-17", count: 6 },
        { date: "2021-04-18", count: 6 },
        { date: "2021-04-21", count: 6 },
        { date: "2021-04-24", count: 6 },
        { date: "2021-04-25", count: 6 },
        { date: "2021-04-28", count: 6 },
        { date: "2021-05-01", count: 6 },
        { date: "2021-05-02", count: 6 },
        { date: "2021-05-05", count: 6 },
        { date: "2021-05-08", count: 6 },
        { date: "2021-05-09", count: 6 },
        { date: "2021-05-12", count: 6 },
        { date: "2021-05-15", count: 6 },
      ],
      user: localStorage.getItem("user"),
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
    searchInfoData() {
      let self = this;
      axios.get('http://10.128.211.2:5000/moodland/user/user/' + 123456).then(function (response) {
        //成功时服务器返回 response 数据
        self.user = response.data;
        localStorage.setItem("user", JSON.stringify(self.user))
        console.log(response.data)
        console.log(localStorage.getItem("user"))
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
  }
};
</script>


<style lang="less" scoped>
.user {
  width: 100%;
  height: 100vh;


  .container {
    width: 100%;
    height: 3rem;
    position: absolute;
    top: 1.45rem;

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
          width: 65%;
          height: 55%;
          border-radius: 50%;
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
        font-size: 0.5rem;
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
      margin: 0.15rem auto;
      font-size: 0.35rem;

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