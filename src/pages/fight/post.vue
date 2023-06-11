<template>
  <div class="postphoto">
    <van-nav-bar :title=titleList[postType] left-arrow @click-left="$router.back()" safe-area-inset-top />
    <div class="container">
      <capture @refreshDataList="refreshDataList" />
      <div class="content_container">
        <van-field v-model="message" rows="4" autosize type="textarea" placeholder="请输入留言" show-word-limit maxlength="150"
          :clearable="clearable" />
      </div>
      <div class="image_container">
        <van-badge :color="moodColor[emotion]">
          <van-image radius=6 :src="file" width="2.8rem" height="2.8rem" fit="cover" @click="preview()" />
          <template #content>
            <i :class="loading ? 'iconfont icon-shalou' : moodIcon[emotion]"
              style="font-size:0.5rem;margin: 0.1rem 0.1rem;"></i>
            <i style="font-size:0.4rem;font-style: inherit;"> {{ loading ? '···' : emotion_strength }}</i>
          </template>
        </van-badge>
      </div>
      <div v-if="postType != 2 && postType != 3">
        <van-cell title="截止日期" :value="enddate" @click="show = true" />
        <van-calendar v-model="show" @confirm="onConfirm" />
        <van-cell title="参与人数" :value="personvalue + '人'" @click="showPerson = true" is-link />
        <van-popup v-model:show="showPerson" round position="bottom">
          <van-picker show-toolbar :columns="person" @cancel="showPerson = false" @confirm="savePerson" />
        </van-popup>
      </div>
      <div v-if="postType == 0">
        <van-cell title="挑战类型" :value="moodtype[fightvalue]" @click="showPicker = true" is-link />
      </div>
      <div v-if="postType == 1">
        <van-cell title="游戏类型" :value="gameType[gamevalue]" @click="showGame = true" is-link />
      </div>
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker show-toolbar :columns="moodtype" @cancel="showPicker = false" @confirm="saveFightType" />
      </van-popup>
      <van-popup v-model:show="showGame" round position="bottom">
        <van-picker show-toolbar :columns="gameType" @cancel="showGame = false" @confirm="saveGameType" />
      </van-popup>
      <van-field>
      </van-field>
      <van-button :loading="loading" @click="release()" type="primary" block style="position: fixed;bottom: 0px;"
        color=var(--mydarkblue)>发布</van-button>
    </div>
  </div>
</template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import capture from '@/components/capture/capture';
import router from '../../router';
import filePopup from '@/components/filePopup/filePopup'
import { Dialog, ImagePreview } from 'vant';
import axios from "axios";
export default {
  name: "postphoto",
  data() {
    return {
      challenge_id: parseInt(this.$route.query.challenge_id),
      showPerson: false,
      personvalue: 1,
      enddate: '',
      loading: true,
      date: '',
      // defaultDate:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
      show: false,
      chartColumn: null,
      switchChecked: false,
      clearable: true,
      message: '',
      switchChecked: localStorage.getItem("notice") == 'true',
      emotion: 3,
      emotion_strength: 40,
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem("user")),
      headerLeftStatus: false,
      file: "",
      showPicker: false,
      showGame: false,
      titleList: ["发布挑战", "发布游戏"],
      //挑战
      postType: this.$route.query.postType,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      person: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      fightvalue: 0,
      challenge_type:parseInt(this.$route.query.challenge_type),
      gamevalue: 0,
      param: null,
      diary_id: null,
      myEmotion:{},
      //游戏
      gameType: [],
      gameType_id: 0,
    };
  },
  components: {
    capture,
    [ImagePreview.Component.name]: ImagePreview.Component,
    // CalendarHeatmap
  },
  methods: {
    // 设置默认enddate
    endTime(){
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      console.log("month", month);
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
      this.enddate =  year +"/" +dateArr[0] +"/" +dateArr[1] +" " +"23:59:59"
    },
    // 获取当前时间
    currentTime() {
      var date = new Date();
      var year = date.getFullYear(); //月份从0~11，所以加一
      let month = date.getMonth();
      console.log("month", month);
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
      console.log("strDate", strDate);
    },
    // 获取照片文件格式
    base64ToFile(base64, fileName) {
      // 将base64按照 , 进行分割 将前缀  与后续内容分隔开
      const data = base64.split(',')
      // 利用正则表达式 从前缀中获取图片的类型信息（image/png、image/jpeg、image/webp等）
      const type = data[0].match(/:(.*?);/)[1]
      // 从图片的类型信息中 获取具体的文件格式后缀（png、jpeg、webp）
      const suffix = type.split('/')[1]
      // 使用atob()对base64数据进行解码  结果是一个文件数据流 以字符串的格式输出
      const bstr = window.atob(data[1])
      // 获取解码结果字符串的长度
      let n = bstr.length
      // 根据解码结果字符串的长度创建一个等长的整形数字数组
      // 但在创建时 所有元素初始值都为 0
      const u8arr = new Uint8Array(n)
      // 将整形数组的每个元素填充为解码结果字符串对应位置字符的UTF-16 编码单元
      while (n--) {
        // charCodeAt()：获取给定索引处字符对应的 UTF-16 代码单元
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 利用构造函数创建File文件对象
      // new File(bits, name, options)
      const file = new File([u8arr], `${fileName}.${suffix}`, {
        type: type
      })
      // 将File文件对象返回给方法的调用者
      return file
    },
    // 返回表情
    searchMoodData() {
      let self = this;
      let param = new FormData()
      const time = (new Date()).valueOf()
      const name = time
      const fd = this.base64ToFile(this.file, name)
      param.append('file', fd)
      this.param = fd;
      console.log("ori_param", this.param)
      console.log("localStorage.getItem", localStorage.getItem("notice"))
      axios.post('http://10.128.211.227:5000/predict', param).then(function (response) {
        //成功时服务器返回 response 数据
        console.log(response.data)
        self.loading = false;
        if(self.postType==0){//发布
          self.emotion = response.data[0].class
          self.emotion_strength = Math.round(response.data[0].probability * 100)
          for(var i=0;i<response.data.length;i++){
            self.myEmotion[response.data[i].class]=response.data[i].probability
          }
          console.log(self.myEmotion)
        }else{
          var myEmotion ={}
          
          for(var i=0;i<response.data.length;i++){
            myEmotion[response.data[i].class]=response.data[i].probability
          }
          self.emotion = self.challenge_type
          self.emotion_strength = Math.round(myEmotion[self.challenge_type] * 100)
          self.myEmotion = myEmotion
          console.log(self.myEmotion)
          console.log(self.emotion_strength)
        }
        
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 发布
    release() {
      let self = this;
      const fd = new FormData()
      this.currentTime();
      fd.append("file", self.param)
      // 发布挑战
      if (this.postType == 0) {
        axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}`, {
          "socialChallenge": {
            challenge_id: "",
            challengerList: [],
            end_time: self.enddate,
            init_time: self.date,
            initiator_id: self.user.user_id,
            join_num: 0,
            max_num: self.personvalue,
            status: 0,
            type: self.fightvalue,
          }
        }).then(function (response) {
          console.log("-------", response)
          if(response.data.success){

            self.challenge_id = JSON.parse(response.data.info).challenge_id

            const fd = new FormData()
            self.currentTime();
            fd.append("file", self.param)
            fd.append("diary", JSON.stringify({
              content: self.message,
              emotion: self.emotion,
              emotion_strength:self.emotion_strength,
              picture: "",
              post_time: self.date,
              user_id: self.user.user_id
            }))
            axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}`, fd).then(function (response) {
              console.log(response.data.info)
              self.diary_id = JSON.parse(response.data.info).diary_id
              if(response.data.success){
                  let score = Math.round(self.myEmotion[self.fightvalue] * 100)

                  axios.put(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/setDiaryForChallenge/${self.challenge_id}/${self.diary_id}/${score}`).then(function (response) {
                  console.log("-------", response)
                  if(response.data.success){
                    self.$toast("发布成功")
                    self.$router.push({ path: `/detail`, query: { challenge_id: self.challenge_id,show:false} })
                  }
                }).catch(function (error) {
                  console.log(error);
                });
              }
              
            }).catch(function (error) {
              console.log(error);
            });
          }
          
        }).catch(function (error) {
          console.log(error);
        });
      } else if (this.postType == 1) {
        // 发布游戏
        fd.append("socialGame", JSON.stringify({
          end_time: self.end_time,
          gameInfo: {
            game_info: "",
            game_name: this.gameType[this.gamevalue],
            game_picture: "",
            game_type_id: this.gamevalue + 1,
          },
          game_id: "",
          init_time: self.date,
          initiator_id: self.user.user_id,
          join_num: 0,//?
          max_num: self.personvalue,
          playerList: [],//?         
          status: 0,//?
          type_id: self.gamevalue + 1,
        }))
        axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/social//${self.user.user_id}`, fd).then(function (response) {
          console.log("-------", response)
          // if(response.data.success){
          //   self.$toast("发布成功")
          //   self.$router.push({ path: `/detail`, query: { challenge_id: self.challenge_id,show:false} })
          // }
          
        }).catch(function (error) {
          console.log(error);
        });
      } else if (self.postType == 2) {

            const fd = new FormData()
            self.currentTime();
            fd.append("file", self.param)
            fd.append("diary", JSON.stringify({
              content: self.message,
              emotion: self.emotion,
              emotion_strength: self.emotion_strength,
              picture: "",
              post_time: self.date,
              user_id: self.user.user_id
            }))

        //参与挑战
        axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}`, fd).then(function (response) {
              console.log(response.data.info)
              self.diary_id = JSON.parse(response.data.info).diary_id
              if(response.data.success){
                  let score = self.emotion_strength

                  axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/social/challenge/${self.user.user_id}/${self.challenge_id}/action/join`,{
                    "challenger":{
                    challenge_id: self.challenge_id,
                    identity: 0,
                    participant_id: self.user.user_id,
                    mood_diary: self.diary_id,
                    score: score
                  }
                  }).then(function (response) {
                    console.log("-------", response)
                    self.$toast(response.data.msg)
                    self.$router.push({ path: `/detail`, query: { challenge_id: self.challenge_id,show:false} })
                  }).catch(function (error) {
                    console.log(error);
                  });

              }
              
            }).catch(function (error) {
              console.log(error);
            });
        
        
      }
    },
    // 选择日期
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.enddate = this.formatDate(date);
    },
    //获取base64地址
    refreshDataList(imgSrc) {
      this.file = imgSrc;
      this.searchMoodData()
      console.log(imgSrc)
    },
    // 获取人数
    savePerson(value) {
      this.personvalue = value;
      this.showPerson = false
    },
    // 挑战类型
    saveFightType(value) {
      console.log(value);
      for (var i = 0; i < this.moodtype.length; i++) {
        if (value == this.moodtype[i]) {
          this.fightvalue = i;
          break;
        }
      }
      this.showPicker = false;
    },
    // 游戏类型
    initGameType() {
      let self = this;
      axios.get(process.env.VUE_APP_SERVER_URL + `/moodland/social/game/type`).then(function (response) {
        console.log("123:", response.data)
        for (let i = 0; i < response.data.length; i++) {
          self.gameType.push(response.data[i].game_name)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    saveGameType(value) {
      console.log(value);
      for (var i = 0; i < this.gameType.length; i++) {
        if (value == this.gameType[i]) {
          this.gamevalue = i;
          break;
        }
      }
      this.showGame = false;
    },

    preview() {
      ImagePreview({
        images: [
          this.file,
        ],
        closeable: true,
      });
    },

  },
  mounted: function () {
    this.endTime()
    console.log(this.postType)
    console.log(this.challenge_id)
    this.initGameType()
  },

};
</script>

<style lang="less" scoped>
.postphoto {
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow: auto;

  .container {
    width: 100%;
    height: 3.6rem;
    position: absolute;
    top: 1.45rem;


    .image_container {
      display: flex;
      padding-left: 5vw;
      padding-top: 0.3rem;
      background-color: white;
    }
  }
}

.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>