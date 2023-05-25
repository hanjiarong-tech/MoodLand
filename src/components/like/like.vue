<template>
  <div class="like">
    <!-- 设置颜色可以控制显示的颜色 -->
    <CodeBlock desc="指定默认和激活颜色">
      <VueStarPlus v-model="active2" :color="active2 ? 'rgb(247,186,42)' : '#bfcbd9'">
        <template v-slot:icon>{{ active2 ? '❤' : '❤' }}{{ count }}</template>
      </VueStarPlus>
    </CodeBlock>
    <div v-for="(list, index) in friendlikes" :key="index">
      <img :src="list.protrait" alt="用户avatar">
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import router from '../../router';
import { watch } from 'vue';
export default {
  data() {
    return {
      friendlikes: [],
      active: false,
      active2: true,
      count: 100
    }
  },
  mounted() {
    this.friendlike(this.likeid)
  },
  destroyed() {
  },
  methods: {
    // 获取点赞列表
    async friendlike(diaryid) {
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      let self = this;
      // 先用我的日志替代一下
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + diaryid + '/like', config).then(function (response) {
        //成功时服务器返回 response 数据
        self.frienddiarys = response.data;
        console.log("friendlikes ", self.frienddiarys);
      }).catch(function (error) {
        console.log(error);
      });
    },
    likeclick() {

    }
  },
  watch: {
    active2: function (newVal) {
      newVal ? this.count++ : this.count--
    }
  },
  props: {
    likeid: {
      required: true
    },
  }
}

</script>
<style lang="less" scoped>
.capture {
  position: relative;
  margin: 0 auto;
  width: 350px;
  top: 10%;
}
</style>
