<template>
  <div class="like">
    <!-- 设置颜色可以控制显示的颜色 -->
    <VueStarPlus v-model="active2" :color="active2 ? 'red' : 'var(--deepgray)'">
      <template v-slot:icon>{{ active2 ? '❤' : '❤' }}<span style="font-size: 0.5rem;">{{ count }}</span></template>
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
        this.count++;
        let self = this;
        console.log(this.likeid)
        axios.post(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + this.user.user_id + '/' + this.likeid + '/like').then(function (response) {
          console.log(response.data);
          self.friendlike(self.likeid)
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        this.count--;
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

.like{
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  align-items: center;
}

.VueStar {
  font-size: 0.7rem;
}

/deep/ .VueStar__ground{
  width:1.5rem;
  height:1rem;
}

/deep/ .VueStar__decoration{
  left: -6vw;
  top: -6vw;
}
</style>
