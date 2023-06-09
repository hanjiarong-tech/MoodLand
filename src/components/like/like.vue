<template>
  <div class="like">
    <!-- 设置颜色可以控制显示的颜色 -->
    <VueStarPlus v-model="active2" :color="active2 ? 'red' : 'var(--deepgray)'">
      <template v-slot:icon>{{ active2 ? '❤' : '❤' }}<span style="font-size: 0.5rem;">{{ count }}</span></template>
    </VueStarPlus>
    <div v-for="(list, index) in friendlikes" :key="index">
      <img :src="list.avatar" alt="用户头像">
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
      active2: this.ilike?true:false,
      count: 0,
      user: JSON.parse(localStorage.getItem("user")),
    }
  },
  mounted() {
    this.friendlike(this.likeid)
  },
  destroyed() {
  },
  methods: {
    // 获取点赞列表
    friendlike(diaryid) {
      let self = this;
      // console.log(this.likeid)
      // console.log(self.user.user_id)
      axios.get(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + self.user.user_id + '/' + self.likeid + '/like').then(function (response) {
        self.frienddiarys = response.data;
        self.$emit("change",self.frienddiarys)
        self.count = response.data.length
      }).catch(function (error) {
        console.log(error);
      });
    },

    noticeFriend:function(user_id) {
      let self = this;
      let notice = {
        action: 0,
        content: "给你点赞啦",
        has_read: 0,
        notice_id: 0,
        notice_type: 2,
        notice_url: self.likeid,
        friend_id:self.user.user_id,
        user_id: user_id
      }
      console.log(notice)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/notice/${user_id}`, notice, config).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)

      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  watch: {
    active2: function (newVal) {
      if (newVal) {
        let self = this;
        // console.log(this.likeid)
        axios.post(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + this.user.user_id + '/' + this.likeid + '/like').then(function (response) {
          // console.log(response.data);
          self.friendlike(self.likeid)

          if(self.user.user_id!=self.user_id){//自己点的赞就不要提醒了
            self.noticeFriend(self.user_id)
          }
          
        }).catch(function (error) {
          console.log(error);
        });
        
      } else {
        let self = this;
        // console.log(this.likeid)
        axios.delete(process.env.VUE_APP_SERVER_URL + '/moodland/diary/' + this.user.user_id + '/' + this.likeid + '/like').then(function (response) {
          // console.log(response.data);
          self.friendlike(self.likeid)
        }).catch(function (error) {
          console.log(error);
        });
      }
      newVal ? this.count++ : this.count--;
    },

    
  },
  props: {
    likeid: {
      required: true
    },
    user_id: {
      user_id: 0
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
