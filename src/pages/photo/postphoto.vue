<template>
  <div class="postphoto">
    <van-nav-bar title="发布心情" left-arrow @click-left="$router.back()" />
    <div class="container">
      <div class="content_container">
        <van-field v-model="message" rows="4" autosize type="textarea" placeholder="请输入留言" show-word-limit maxlength="150"
          :clearable="clearable" />
      </div>
      <!-- <calendar-heatmap start-date="2023-03-01" :vert"ical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
      <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
      <div class="image_container">
        <van-badge :color="moodColor[emotion]">
          <van-image radius=6 :src="file" width="2.8rem" height="2.8rem" fit="cover" @click="preview()" />
          <template #content>
            <i :class="moodIcon[emotion]" style="font-size:0.5rem;margin: 0.1rem 0.1rem;"></i>
            <i style="font-size:0.4rem;font-style: inherit;"> {{ emotion_strength }}</i>
          </template>
        </van-badge>
      </div>
      <van-field name="switch" label="提醒好友">
        <template #input>
          <van-switch @click="checknotice()" v-model="switchChecked" size="20" />
        </template>
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
import filePopup from '@/components/filePopup/filePopup'
import { Dialog, ImagePreview } from 'vant';
import axios from "axios";
export default {
  name: "postphoto",
  data() {
    return {
      loading: true,
      input:null,
      chartColumn: null,
      checked: true,
      switchChecked: localStorage.getItem("notice") == 'true',
      checked: true,
      switchChecked: localStorage.getItem("notice") == 'true',
      clearable: true,
      message: '',
      emotion: 3,
      emotion_strength: 40,
      moodColor: ['rgb(255,150,178)', 'rgb(75,167,133)', 'rgb(122,162,255)', 'rgb(255,202,43)', 'rgb(28,196,233)', 'rgb(243,109,66)', 'rgb(124,225,0)'],
      moodIcon: ['iconfont icon-surprise', 'iconfont icon-ghost-fill', 'iconfont icon-confused2', 'iconfont icon-happy-face', 'iconfont icon-sad-f', 'iconfont icon-angry2', 'iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem("user")),
      headerLeftStatus: false,
      file: this.$route.query.file,
      date: "",
    };
  },
  components: {
    "v-header": header,
    "v-footer": footer,
    CalendarHeatmap,
    [ImagePreview.Component.name]: ImagePreview.Component,
    // CalendarHeatmap
  },
  methods: {
    release() {
      let self = this;
      const fd = new FormData()
      fd.append("pictrue", self.file)
      axios.post(process.env.VUE_APP_SERVER_URL + `/moodland/diary/${self.user.user_id}`, {
        "diary": {
          content: self.message,
          emotion: self.emotion,
          emotion_strength: self.emotion_strength,
          picture: "",
          post_time: self.date,
          user_id: 123
        }
      }).then(function (response) {
        console.log("-------", response)
      }).catch(function (error) {
        console.log(error);
      });
    },
    checknotice() {
      console.log(this.switchChecked)
    },
    searchMoodData() {
      let self = this;
      let param = new FormData()
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // }
      const time = (new Date()).valueOf()
      const name = time
      const fd=this.base64ToFile(this.file, name)
      param.append('file', fd)
      console.log("localStorage.getItem", localStorage.getItem("notice"))
      axios.post('http://10.128.211.227:5000/predict', param).then(function (response) {
        //成功时服务器返回 response 数据
        console.log("1234", response.data)
        self.loading = false;
      }).catch(function (error) {
        console.log(error);
      });
    },
    jumpToOthers(link) {
      router.push(link);
    },

    preview() {
      ImagePreview({
        images: [
          this.file,
        ],
        closeable: true,
      });
    },
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

  },
  mounted() {
    this.searchMoodData();
  },

  watch: {
    '$route': 'searchInfoData'
  }

};
</script>

<style lang="less" scoped>
.postphoto {
  width: 100%;
  height: 100vh;
  background-color: white;

  .container {
    width: 100%;
    height: 3.6rem;
    position: absolute;
    top: 1.45rem;


    .image_container {
      display: flex;
      margin-left: 5vw;
      margin-top: 0.3rem;
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