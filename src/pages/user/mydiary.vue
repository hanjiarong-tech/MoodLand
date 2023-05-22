<template>
    <div class="mydiary">
      <van-nav-bar title="我的心情" left-arrow @click-left="$router.back()" />
      <div class = "container">
        <!-- <calendar-heatmap start-date="2023-03-01" :vertical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
        <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
        <van-cell-group inset>
          <van-cell title="我的心情" is-link to="mydiary" icon="calendar-o"  style="font-weight: bold;" />
          <calendar-heatmap end-date="2023-05-22" :values="timeValue" :vertical="false" :range-color="colors" :max="20" style="margin:0.3rem 0"/>
        </van-cell-group>
      </div>
    </div>
  </template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import filePopup from '@/components/filePopup/filePopup'
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      chartColumn: null,
      colors: ['#ebedf0',
        'rgba(255,202,43,0.4)',
        'rgba(255,202,43,0.6)',
        'rgba(255,202,43,0.8)',
        'rgba(255,202,43,1.0)',//4
        'rgba(243,109,66,0.4)',
        'rgba(243,109,66,0.6)',
        'rgba(243,109,66,0.8)',
        'rgba(243,109,66,1.0)',//8
        'rgba(124,225,0,0.4)',
        'rgba(124,225,0,0.6)',
        'rgba(124,225,0,0.8)',
        'rgba(124,225,0,1.0)',//12
        'rgba(28,196,233,0.4)',
        'rgba(28,196,233,0.6)',
        'rgba(28,196,233,0.8)',
        'rgba(28,196,233,1.0)',//16
        'rgba(122,162,255,0.4)',
        'rgba(122,162,255,0.6)',
        'rgba(122,162,255,0.8)',
        'rgba(122,162,255,1.0)',//20
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
        { date: "2021-03-26", count: 6 },
        { date: "2021-03-27", count: 6 },
        { date: "2021-03-28", count: 6 },
        { date: "2021-03-31", count: 6 },
        { date: "2021-04-03", count: 6 },
        { date: "2021-04-07", count: 6 },
        { date: "2023-04-04", count: 16 },
        { date: "2023-04-10", count: 15 },
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
    jumpToOthers(link) {
      router.push(link);
    }
    
  },
  mounted: function () {
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

  .container {
    width: 100%;
    height: 3.6rem;
    position: absolute;
    top: 1.45rem;
  }
}
</style>