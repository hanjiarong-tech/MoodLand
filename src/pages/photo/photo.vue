<template>
  <div class='home'>
    <swiper :options="swiperOptions">
      <swiper-slide @mousemove.stop style="height: calc( 100vh - 60px );">
        <capture @refreshDataList="refreshDataList" />
        <div class = "hint">
          <i>查看好友的心情 ↓</i>
        </div>
      </swiper-slide>
      <swiper-slide v-for="(list, index) in frienddiarys" :key="index">
        <card :list="list"></card>
      </swiper-slide>
    </swiper>
    <v-footer></v-footer>
  </div>
</template>
<script>
import card from '@/components/card/card'
import footer from "@/components/footer/index";
import axios from "axios";
import comment from '@/components/comment/comment';
import like from '@/components/like/like'
import capture from '@/components/capture/capture';
export default {
  name: "index",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      serverUrl: '',
      frienddiarys: [],
      swiperOptions: {
        noSwiping: true,
        noSwipingClass: "ss",
        touchMoveStopPropagation: true,
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
    }
  },

  mounted() {
    this.friendDiary();
  },
  components: {
    "v-footer": footer,
    comment,
    capture,
    like,
    card
  }
} 
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .hint{
    position: absolute;
    display: flex;
    bottom: 6vh;
    width: 100%;
    font-size: 0.4rem;
    color: var(--mygreen);
    justify-content: center;
  }
}
</style>
