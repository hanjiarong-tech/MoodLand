<template>
  <div class="setting">
    <van-nav-bar title="好友列表" left-arrow @click-left="$router.back()" />
    <div class="container" v-for="list2 in detail">
      <div class="container-bj">
        <div class="bj-left">
          <img :src="list2.img">
        </div>
        <div class="bj-right">
          <p class="title">{{ list2.name }}</p>
          <van-tag color="var(--light-yellow)" text-color="orange" round type="primary" size="large">{{ list2.intimacy}}</van-tag>
          <!-- <p style="color:var(--deep-gray)">{{ list2.describe }}</p> -->
        </div>
        <div class="bj-action">
          <van-button icon="point-gift" type="primary" style="font-size: 1em;background-color: transparent;color: #ff8917;border: 0;"/>
        </div>
      </div>
      <van-divider :style="{margin:0,padding: '0 16px'}"/>
    </div>
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
          name: "名字",
          describe: "描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          describe: "描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          intimacy:89,
          describe: "描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          intimacy:89,
          describe: "描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          describe: "描述"
        },
        {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          describe: "描述"
        },
                {
          img: "../../../static/img/avatar.jpg",
          name: "名字",
          describe: "描述"
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
  width: 100%;
  height: 2rem;
  top: 1.45rem;
  background-color: white;

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
      width: 55%;
      height: 100%;
      float: left;
      display: -webkit-box;
      display: -ms-flexbox;
      // display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: space-evenly;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      // -ms-flex-direction: column;
      flex-direction: column;
      span {
        font-weight: bold;
      }
    }
    .bj-action{
      float: right;
      display: flex;
      height: 100%;
      width: 19%;
      align-content: center;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 50%;
    }
    .title{
      font-size: 0.45rem;
    }

    p {
      font-size: 0.35rem;
      color:#000000;
    }
  }
}
</style>

<style scoped>
.content {
  top: auto;
  position: absolute;
  width: 100%;
}
.setting{
  background-color: var(--background-gray);
  height:100vh

}
</style>

