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
  border-bottom:1px solid rgba(0, 0, 0, 0.679);

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

