<template>
  <div class="setting">
    <van-nav-bar title="消息通知" left-arrow @click-left="$router.back()" />
    <div class="container" v-for="list2 in detail">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="list2.img">
        </div>
        <div class="bj-right">
          <p class="title">{{ list2.name }}</p>
          <p>{{ list2.describe }}</p>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>

</template>

<script>
import footer from '@/components/footer/index'
export default {
  data() {
    return {
      detail: [
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx发起情绪挑战",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx添加好友",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx赠送礼物",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx发起社交游戏",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx发起情绪挑战",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx添加好友",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx赠送礼物",
          describe: "挑战描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "xxx发起社交游戏",
          describe: "挑战描述"
        },
      ],
    };
  },
  mounted() {
  },
  methods: {
    
  },
  components: {
    "v-footer": footer,
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 95%;
  height: 2rem;
  border-radius: 5%;
  top: 1.45rem;
  background-color: white;
  margin: 10px auto;

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
        width: 15vw;
        height: 15vw;
        border-radius: 10%;
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
    .title{
      font-size: 0.5rem;
    }

    p {
      font-size: 0.35rem;
      color:#000000;
    }
  }
}
</style>

