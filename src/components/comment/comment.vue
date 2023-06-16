<template>
  <div class="comment-wrap" :style="showComment ? `height:50vh` : `height:0;`">
    <div class="comment-list" style="margin: 5vw;" v-if="showComment">
      <div class="comment-top">
        <!-- <div class="number">15条评论</div> -->
        <div class="close" @click="close">
          <span class="iconfont icon-guanbi" style="font-weight: bold;font-size: 18px"></span>
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-box" v-for="item in comments">
          <div class="comment-item" @click="sendMessage(item.comment_id, 0, item.commentator_id,item.commentator_name)">
            <img class="user-pic"
              :src="item.commentator_avatar == null ? serverUrl + '/moodland/vue'+'/img/avatar.svg' : serverUrl + '/moodland/' + item.commentator_avatar"
              alt="头像" />
            <div class="item-info">
              <div class="replay">
                <p class="name">{{ item.commentator_name }}</p>
                <p class="replay-des">{{ item.comment_text }}</p>
                <span class="time">{{ item.comment_time }}</span>
                <span v-if="item.commentator_id ===user.user_id" @click="deleteComment(item.comment_id)" class="time">删除</span>
              </div>
            </div>
          </div>
          <div v-for="reply in item.reply">
            <div class="sub-comment-item" @click="sendMessage(reply.reply_id, 1, reply.commentator_id,reply.commentator_name)">
              <img class="user-pic"
                :src="reply.commentator_avatar == null ? serverUrl + '/moodland/vue'+'/img/avatar.svg' : serverUrl + '/moodland/' + reply.commentator_avatar"
                alt="头像" />
              <div class="item-info">
                <div class="replay">
                  <span class="name">{{ reply.commentator_name }} 回复</span>
                  <span class="name">@{{ reply.reviewed_name }}：</span>
                  <p class="reply-content">{{ reply.comment_text }}</p>
                  <span class="time">{{ reply.comment_time }}</span>
                  <span v-if="reply.commentator_id ===user.user_id" @click="deleteComment(reply.comment_id)" class="time">删除</span>
                </div>
              </div>
            </div>
          </div>
          <van-divider :style="{ padding: '0 16px' }" />
        </div>
      </div>
      <div class="reply-input" v-if="showComment">
        <input v-model="content" type="text" :placeholder="placeholder" />
        <mt-button type="primary" size="small" @click="send()">发送</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as CommentData from '@/api/mockdata';
import router from '../../router';
import axios from "axios";
// import { send } from 'process';
export default {
  name: "comment",
  data() {
    return {
      serverUrl: process.env.VUE_APP_SERVER_URL,
      comment_id: "",
      comment_type: 0,
      content: '',
      reply_id: "",
      reviewed_id:this.diary_userid,
      date: '',
      placeholder:"输入评论",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    // console.log('123', this.comments)
  },
  props: {
    comments: {
      tyoe: Array,
      required: true
    },
    showComment: {
      required: true
    },
    diaryid: {
      required: true
    },
    diary_userid:{
      required:true
    }

  },
  methods: {
    // 评论关闭
    close() {
      this.$emit('change', false);
    },
    sendMessage(commentid, commenttype, commentatorid,commentatorname) {
      this.reply_id = commentid;
      this.comment_type = commenttype;
      this.reviewed_id = commentatorid;
      this.placeholder="回复"+commentatorname+":"
      console.log(commentatorname)
      console.log("click");
    },
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      var dateArr = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];
      //如果格式是MM则需要此步骤，如果是M格式则此循环注释掉
      for (var i = 0; i < dateArr.length; i++) {
        if (dateArr[i] >= 1 && dateArr[i] <= 9) {
          dateArr[i] = "0" + dateArr[i];
        }
      }
      var strDate =
        year +
        "/" +
        dateArr[0] +
        "/" +
        dateArr[1] +
        " " +
        dateArr[2] +
        ":" +
        dateArr[3] +
        ":" +
        dateArr[4];
      //此处可以拿外部的变量接收，也可直接返回  strDate:2022-05-01 13:25:30
      this.date = strDate;
    },
    deleteComment(id){
      let self=this;
      axios.delete(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}/${self.diaryid}/comment/${id}`)
      .then(function (response) {
        self.$emit('update');
      }).catch(function (error) {
        console.log(error);
      });
    },
    noticeFriend:function(diaryid,reviewed_id,content) {
      let self = this;
      let notice = {
        action: 0,
        content: "给你评论:  "+content,
        has_read: 0,
        notice_id: 0,
        notice_type: 2,
        notice_url: diaryid,
        friend_id:self.user.user_id,
        user_id: reviewed_id
      }
      console.log(notice)
      const config = {
        headers: {
          'Content-type': "application/json"
        }
      }
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/notice/${reviewed_id}`, notice, config).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)

      }).catch(function (error) {
        console.log(error);
      });
    },
    send() {
      let self = this;
      self.currentTime();
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}/${self.diaryid}/comment/${self.reply_id}`, {
        "comment": {
          // 当前评论id，为null
          comment_id: self.comment_id,
          comment_text: self.content,
          comment_time: self.date,
          comment_type: self.comment_type,
          commentator_id: self.user.user_id,
          diary_id: self.diaryid,
          // 回复的评论的id 可以为null
          reply_id: self.reply_id,
          // 回复的评论者的id 可以为null
          reviewed_id: self.reviewed_id
        }
      }).then(function (response) {
        //成功时服务器返回 response 数据
        
        self.reply_id = '';
        self.comment_type = 0;
        self.reviewed_id =self.diary_userid;
        if(self.reviewed_id != self.user.user_id){
          self.noticeFriend(self.diaryid,self.reviewed_id,self.content);
        }
        

        self.$emit('update');
        self.content="";
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.comment-wrap {
  // position: fixed;
  bottom: 0;
  position: absolute;
  height: 50vh;
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  z-index: 999;
  background-color: white;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: height 0.2s ease;
  

  .comment-body {
    height: 100%;
    overflow: auto;
  }

  // -webkit-transition: -webkit-transform .3s;
  // transition: -webkit-transform .3s;
  // transition: transform .3s;
  // transition: transform .3s, -webkit-transform .3s;
  .comment-box {
    padding-bottom: 10px;
  }

  .comment-top {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;

    .number {
      flex: 1;

      text-align: center;
    }

    .close {
      position: absolute;
      right: 16px;
      top: 16px;
      color: #666;
    }
  }

  .comment-body {
    max-height: 45vh;

    .comment-item {
      display: flex;
      cursor: pointer;
      width: 100%
    }

    .comment-item:active {
      background: #eef0f4;
    }

    .sub-comment-item:active {
      background: #eef0f4;
    }

    .sub-comment-item {
      display: flex;
      margin-left: 33px;
      margin-top: 10px;

      .re-name {
        padding: 0 10px;
        color: #686868;
      }
    }

    .user-pic {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      object-fit: cover;
    }

    .item-info {
      margin-left: 10px;
      display: flex;
      flex: 1 auto;

      .replay {
        width: 90%;
      }

      .replay-des,
      .reply-content {
        font-size: 0.4rem;
        line-height: 0.9rem;
      }

      .name {
        color: #686868;
        font-size: 0.4rem;
        font-weight: bold;
      }

      .time {
        color: #686868;
        font-size: 0.3rem;
      }

      .zan {
        color: rgb(205, 205, 205);
        display: flex;

        .icon-xin {
          font-size: 20px;
        }

        .active {
          color: red;
        }

        p {
          font-size: 15px;
        }
      }
    }

    .more {
      margin-left: 30px;
    }
  }

  .reply-input {
    font-size: 13px;
    width: 100%;
    height: 50px;
    border-top: 1px solid #d9d9d9;
    position: absolute;
    bottom: 0;
    left: 0;
    align-items: center;
    display: flex;
    background-color: #fff;

    input {
      line-height: 40px;
      width: 85%;
      padding: 0 10px;
    }

    input:focus {
      border: none;
    }

    .emoji {
      margin: 0 10px;
    }

    .emoji,
    .iconfont {
      font-size: 30px;
      color: #686868;
    }

  }

}
</style>