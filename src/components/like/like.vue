<template>
  <div class="like">
    <!-- 设置颜色可以控制显示的颜色 -->
    <VueStarPlus v-model="active2" :color="active2 ? '#ff0000' : '#bfcbd9'">
      <template v-slot:icon>{{ active2 ? '❤' : '❤' }}<span style="font-size: 14px;">{{ count }}</span></template>
    </VueStarPlus>
    <div v-for="(list, index) in friendlikes" :key="index">
      <img :src="list.avatar" alt="用户avatar">
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import router from '../../router';
import { watch } from 'vue';
import axios from 'axios'
export default {
  data() {
    return {
      friendlikes: [],
      active2: false,
      count: 0,
      user: JSON.parse(localStorage.getItem("user")),
    }
  },
  mounted() {
    this.friendlike(this.likeid)
    this.mylike()
  },
  destroyed() {
  },
  methods: {
    // 获取点赞列表
    friendlike(diaryid) {
      let self = this;
      console.log(this.likeid)
      console.log(self.user.user_id)
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + self.user.user_id + '/' + self.likeid + '/like').then(function (response) {
        self.frienddiarys = response.data;
        console.log("friendlikes ", response.data);
        self.$emit("change",self.frienddiarys)
        self.count = response.data.length
      }).catch(function (error) {
        console.log(error);
      });
    },
    mylike() {
      this.ilike?this.active2=true:this.active2=false;
    }
  },
  watch: {
    active2: function (newVal) {
      if (newVal) {
        let self = this;
        console.log(this.likeid)
        axios.post(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + this.user.user_id + '/' + this.likeid + '/like').then(function (response) {
          console.log(response.data);
          self.friendlike(self.likeid)
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        let self = this;
        console.log(this.likeid)
        axios.delete(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + this.user.user_id + '/' + this.likeid + '/like').then(function (response) {
          console.log(response.data);
          self.friendlike(self.likeid)
        }).catch(function (error) {
          console.log(error);
        });
      }
      newVal ? this.count++ : this.count--;

    }
  },
  props: {
    likeid: {
      required: true
    },
    ilike:{
      required: true
    }
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

.VueStar {
  font-size: 24px
}
</style>
