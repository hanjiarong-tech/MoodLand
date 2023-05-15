
<template>
  <div class="home-content">
    <topBar></topBar>
    <router-view></router-view>
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
      videos: [// 视频数据
      ],
    };
  },
  components: {
    topBar,
    "v-footer": footer,
  },
  // mounted() {
  //   this.$router.push({ path: 'fight' });
  // },
};
</script>

<style lang="less" scoped>
.home-content {
  background: #000;
  display: flex;
  flex-direction: column;
  // height: 100vh;
}
</style>

