<template>
  <div class="fight">
    <!-- 送礼功能 -->
    <div class="container-order">
      <div class="container-order-2">
        <div v-for="list in container" @click="jumpTo(list.link)" :style = "list.style">
          <i :class="list.img"></i>
          <span>{{ list.name }}</span>
        </div>
      </div>
    </div>
    <p style="font-size: 20px;">发现挑战</p>
    <!-- 发现挑战 -->
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
  </div>
</template>

<script>
import { getData } from '@/api/data'
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import router from '../../router';

export default {
  data() {
    return {
      news: [],
      container: [
        {
          img: "iconfont icon-fabuguanli",
          name: "发布挑战",
          style: "background-color:var(--light-yellow);color:orange",
          link:"/ftorelease"
        },
        {
          img: "iconfont icon-gongdanjilu",
          name: "我发布的",
          style: "background-color:var(--light-green);color:var(--mygreen)",
          link:"/freleased"
        },
        {
          img: "iconfont icon-hands-fill",
          name: "我参与的",
          style: "background-color:var(--light-blue);color:var(--mydarkblue)",
          link:"/finvolved"
        },
      ],
      detail: [
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
        {
          img: "../../static/img/avatar.jpg",
          name: "挑战名称",
          describe: "挑战描述"
        },
      ],
    };
  },
  methods: {
    tryon() {
      router.push("/main");
    },
    jumpTo(link){
      console.log(link);
      router.push(link);
    }
  },
  mounted() {
  },
  components: {
    "v-header": header,
    "v-footer": footer
  }
};
</script>

<style lang="less" scoped>
.fight {
  top: 100%;
  position: absolute;
  width: 100%;
  overflow: hidden;
  padding: 0 0 100px 0;
}

.container-order {
  height: 3.5rem;
  background: #ffffff;
  display: block;
  margin: 0.3rem 16px;
  font-size: 0.35rem;
  border-radius: 8px;

  .container-order-2 {
    width: 100%;
    margin: 0;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-evenly;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    div {
      width: 29%;
      padding: 0.7rem 0;
      background-color: red;
      border-radius: 8px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;

      i {
        width: 0.8rem;
        height: 0.8rem;
        margin: auto;
      }

      span {
        text-align: center;
        padding-top: 0.3rem;
      }
    }
  }



}

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