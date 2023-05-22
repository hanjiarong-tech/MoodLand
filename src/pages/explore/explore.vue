
<template>
  <div class="home-content">
    <!-- <van-tabs v-model="active" animated route>
      <van-tab :title="'情绪挑战'" to="/explore/fight">
      </van-tab>
      <van-tab :title="'社交游戏'" to="/explore/game">
      </van-tab>
      <van-tab :title="'社交礼物'" to="/explore/gift">
      </van-tab>
    </van-tabs>
    <router-view></router-view> -->
    <van-tabs v-model="active" color="var(--theme-color)" >
        <van-tab v-for="(item,index) in arr" :title="item.title" :to="item.path" >
          <router-view></router-view>
        </van-tab>
    </van-tabs>
    <v-footer></v-footer>
  </div>
</template>

<script>
import topBar from '@/components/top/TopBar.vue'; // 顶部导航组件
import footer from '@/components/footer/index'
export default {
  name: 'Index',
  data() {
    return {
      active:0,
      arr:[
        {
          title:'情绪挑战',
          path:'/explore/fight'
        },
        {
          title:'社交游戏',
          path:'/explore/game'
        },
      ]
    };
  },
  components: {
    "v-footer": footer,
  },
  // watch: {
  //   active(newVal){
  //     switch (newVal) {
  //       case 0: 
  //         this.$router.push('/explore/fight')
  //         break;
  //       case 1: 
  //         this.$router.push('/explore/game')
  //         break;
  //       case 2:
  //         this.$router.push('/explore/gift')
  //         break;
  //     }
  //   }
  // },
  // mounted() {
  //   this.$router.push({ path: 'fight' });
  // },
};
</script>

<style lang="less" scoped>
.home-content {
  display: flex;
  flex-direction: column;
  // height: 100vh;
}
/deep/.van-tabs__wrap{
 width: 100%;
 background: #fff;
 position: fixed;
 z-index: 1;
 overflow: hidden;
}
.item {
  flex: 1;
  text-align: center;
  background-color: #dcf8e1;

  span {
    padding: 2px 0px;
    text-align: center;
    position: relative;
  }

  .active {
    color: #ffffff;

    &:after {
      content: "";
      height: 1px;
      width: 15vw;
      left: 3px;
      bottom: -2px;
      position: absolute;
      background: #ffffff;
    }
  }
}
</style>

