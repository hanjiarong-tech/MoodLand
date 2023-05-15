<template>
  <div class="comment-wrap">
    <div class="comment-list">
      <div class="comment-top">
        <!-- <div class="number">15条评论</div> -->
        <div class="close" @click="close">
          <span class="iconfont icon-guanbi" style="font-weight: bold;font-size: 13px"></span>
        </div>
      </div>
      <div class="comment-body">
        <div class="comment-box" v-for="item in comments">
          <div class="comment-item" @click="sendMessage()">
            <img class="user-pic" :src="item.commentator_avatar" alt="头像" />
            <div class="item-info">
              <div class="replay">
                <p class="name">{{ item.commentator_name }}</p>
                <p class="replay-des">{{ item.comment_text }}</p>
                <p class="time">{{ item.comment_time }}</p>
              </div>
            </div>
          </div>
          <div v-for="reply in item.reply">
            <div class="sub-comment-item" @click="">
              <img class="user-pic" :src="reply.reviewed_avatar" alt="头像"/>
              <div class="item-info">
                <div class="replay">
                  <span class="name">{{ reply.commentator_name}}回复</span>
                  <span class="name">@{{reply.reviewed_name}}：</span>
                  <p class="reply-name">{{ reply.comment_text }}</p>
                  <p class="time">{{ reply.comment_time }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="comment-item">
            <img class="user-pic" src="../../../static/img/头像.jpg" alt />
            <div class="item-info">
              <div class="replay">
                <p class="name">快乐仔逛学习</p>
                <p class="replay-des">快乐仔每天在学习</p>
                <p class="time">03-19<span> 回复</span></p>
              </div>
              <div class="zan" @click="showLike">
                <span style="text-align: center">
                  <i class="iconfont icon-xin" :class="{ 'active': isShow }"></i>
                  <p>10</p>
                </span>
              </div>
            </div>
          </div>
          <div class="sub-comment-item">
            <img class="user-pic" src="../../../static/img/头像.jpg" alt />
            <div class="item-info">
              <div class="replay">
                <p class="name">开心开心😊</p>
                <p class="reply-name">学习快乐</p>
                <p class="time">03-19</p>
              </div>
              <div class="zan">
                <span style="text-align: center">
                  <i class="iconfont icon-xin" :class="{ 'active': isShow }"></i>
                  <p>66</p>
                </span>
              </div>
            </div>
          </div> -->
        </div>
        <!-- <div class="comment-box">
          <div class="comment-item">
            <img class="user-pic" src="../../../static/img/头像.jpg" alt />
            <div class="item-info">
              <div class="replay">
                <p class="name">快乐仔逛学习</p>
                <p class="replay-des">快乐仔每天在学习</p>
                <p class="time">03-19</p>
              </div>
              <div class="zan" @click="showLike">
                <span style="text-align: center">
                  <i class="iconfont icon-xin" :class="{ 'active': isShow }"></i>
                  <p>10</p>
                </span>
              </div>
            </div>
          </div>
          <div class="sub-comment-item">
            <img class="user-pic" src="../../../static/img/头像.jpg" alt />
            <div class="item-info">
              <div class="replay">
                <p class="name">开心开心😊</p>
                <p class="reply-name">学习快乐</p>
                <p class="time">03-19</p>
              </div>
              <div class="zan">
                <span style="text-align: center">
                  <i class="iconfont icon-dianzan2" :class="{ 'active': isShow }"></i>
                  <p>66</p>
                </span>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="reply-input">
        <input type="text" placeholder="有爱评论，说点好听的~" />
        <mt-button type="primary" size="small">发送</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import * as CommentData from '@/api/mockdata';
export default {
  name: "comment",
  data() {
    return {

    };
  },
  created() {
    console.log(this.comments)
  },
  props: {
    comments:{
      required:true
    },

  },
  methods: {
    // 评论关闭
    close() {
      this.$emit('change', false);
    },
  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>


.comment-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 500px;
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  z-index: 999;
  padding: 10px;
  background-color: #F8F8FF;
  box-sizing: border-box;

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
      position:absolute;
      right:5px;
      padding-right: 5px;
      color: #666;
    }
  }

  .comment-body {
    max-height: 400px;
    overflow: auto;
    margin-top: 15px;

    .comment-item {
      display: flex;
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
    }

    .item-info {
      margin-left: 10px;
      display: flex;
      flex: 1 auto;

      .replay {
        width: 90%;
      }

      .replay-des,
      .reply-name {
        font-size: 14px;
        line-height: 20px;
      }

      .name {
        color: #686868;
        font-size: 13px;
      }

      .time {
        color: #686868;
        font-size: 13px;
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