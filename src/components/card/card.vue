<template>
  <div>
      <div class="card">
        <div class="title">
          <div class="bj-left">
            <img src="../../../static/img/avatar.jpg" alt="portrait">
          </div>
          <div class="bj-right">
            <span style="font-size: 0.4rem;font-weight: bold;">{{ list.user_id }}</span>
            <span style="font-size: 0.35rem;">{{ list.post_time }}</span>
          </div>
        </div>
        <div class="container">
          <img :src="list.picture == null ? '../../../static/img/avatar.jpg' : serverUrl + '/moodland/' + list.picture"
            alt="mood image" />
          <div class="content">
            <van-tag mark type="primary" size="large" :color="moodColor[list.emotion]">
              <i :class="moodIcon[list.emotion]" style="font-size: 0.5rem;margin: 0 0.1rem;"></i>{{
                list.emotion_strength }}
            </van-tag>
            <!-- 点赞列表 -->
            <div class="portrait">
              <img v-for="(list, index) in friendlikes" :key="index"
                :src="list.avatar == null ? '../../../static/img/avatar.jpg' : serverUrl + '/moodland/' + list.avatar"
                alt="用户avatar">
            </div>
            <div class="container-con">{{ list.content }}</div>
          </div>
          <!-- 点赞 -->
          <like :likeid="list.diary_id" :ilike="list.has_like" @change="likeAmount"></like>
          <div class="comment">
            <div class="like_count">
              <!-- 评论 -->
              <svg @click="thisCommentData(list.diary_id)" t="1682595957005" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5639" width="30" height="30">
                <path
                  d="M853.333333 768c35.413333 0 64-20.650667 64-55.978667V170.581333A63.978667 63.978667 0 0 0 853.333333 106.666667H170.666667C135.253333 106.666667 106.666667 135.253333 106.666667 170.581333v541.44C106.666667 747.285333 135.338667 768 170.666667 768h201.173333l110.016 117.44a42.752 42.752 0 0 0 60.586667 0.042667L651.904 768H853.333333z m-219.029333-42.666667h-6.250667l-115.797333 129.962667c-0.106667 0.106667-116.010667-129.962667-116.010667-129.962667H170.666667c-11.776 0-21.333333-1.621333-21.333334-13.312V170.581333A21.205333 21.205333 0 0 1 170.666667 149.333333h682.666666c11.776 0 21.333333 9.536 21.333334 21.248v541.44c0 11.754667-9.472 13.312-21.333334 13.312H634.304zM341.333333 490.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m170.666667 0a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z"
                  fill="#3D3D3D" p-id="5640"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    <!-- 展开评论 -->
      <comment class="ss" :showComment="showComment" :comments="commentData" @change="costPlannedAmountChange">
      </comment>
  </div>
</template>
<script>
import axios from "axios";
import comment from '@/components/comment/comment';
import like from '@/components/like/like'
export default {
  name: "index",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      commentData: [],
      friendlikes: [],
      serverUrl: process.env.VUE_APP_SERVER_URL,
      showComment: false,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
  props:{
    list: {
      required: true
    },
  },
  methods: {
    refreshDataList(imgSrc) {
      // 这里返回服务器图片的地址
      console.log(imgSrc)
    },
    // 获取点赞头像列表
    async likeAmount(param1) {
      this.friendlikes = param1;

    },
  
    // 获取评论列表
    async thisCommentData(diaryid) {
      this.showComment = true;
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      let self = this;
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}/${diaryid}/comment`, config).then(function (response) {
        //成功时服务器返回 response 数据
        self.commentData = response.data;
        console.log("res ", self.commentData);
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 关闭评论
    async costPlannedAmountChange(param1) {
      this.showComment = param1;
    },
  },
  mounted() {

  },
  components: {
    comment,
    like
  },
};
</script>

<style lang="less" scoped>

.card {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 10px;
}

.title {
  height: 15%;
  margin: 0.3rem;
}


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
    border-radius: 50%;
  }
}

.bj-right {
  width: 60%;
  height: 100%;
  padding: 0.3rem 0;
  float: left;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  span {
    font-weight: 100;
    font-size: 16px;
  }
}

.container {
  img {
    width: 100%;
  }

  .portrait {
    width: 100%;
    height: 30px;
    margin: 0 5px;

    img {
      width: 30px;
      border-radius: 50%;
    }
  }

  .content {
    .container-con {
      margin: 0.3rem;
      font-size: 0.4rem;
    }
  }

  .comment {
    display: flex;
    justify-content: flex-end;
    margin-right: 0.3rem;
    margin-bottom: 0.3rem;

    .like_count {
      display: flex;
      width: 1.8rem;
      justify-content: space-between;
    }
  }
}
</style>
