<template>
  <div class="capture">
    <canvas id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    <div class="camera_outer">
      <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
      <div class="button_container" :style ="complete_photo?'display:none':''" >
        <van-button round type="primary"  color=var(--mygreen) @click="setImage()" style="height: 2rem;width: 2rem;">
        <i class="iconfont icon-post_pic"></i>
        </van-button>
      </div>
      <div class = "button_container" :style ="complete_photo?'justify-content: space-evenly;width: 70%;':'justify-content: space-evenly;width: 70%;display:none'">
        <van-button round type="primary"  color=var(--mydarkblue) @click="reset()" style="height: 2rem;width: 2rem;">
        <i class="iconfont icon-guanbi"></i>
        </van-button>
        <van-button round type="primary"  color=var(--mydarkblue)  @click="$route.path ==='/photo'?aDiary():aChallgame()" style="height: 2rem;width: 2rem;">
        <i class="iconfont icon-fabuguanli"></i>
        </van-button>
      </div>
      <!-- <input @change="changImg" ref="inputFileRef" type="file" style="display: none;"> -->
      <!-- <div style="display:flex;flex-direction:row;justify-content: space-around;width: 100%;">
        <mt-button size="small" type="primary" @click="reset()">重拍</mt-button>
        <mt-button size="small" type="primary" @click="setImage()">拍照</mt-button>
        <mt-button size="small" type="primary" @click="share()">设置分享范围</mt-button>
        <van-popup v-model:show="shareRange" closeable round position="bottom" :style="{ height: '30%' }"></van-popup>
        <mt-button size="small" type="primary" @click="aDiary()">发布</mt-button>
      </div> -->
      <!-- <mt-field placeholder="发布日志内容" type="textarea" rows="4" v-model="diary" /> -->
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import router from '../../router';

export default {
  data() {
    return {
      videoWidth: 350,
      videoHeight: 350,
      imgSrc: '',
      thisCanvas: null,
      thisVideo: null,
      diary: "",
      shareRange: false,
      complete_photo:false,
      fileUrl:null,
      data:null,
    }
  },
  mounted() {
    // this.$toast("开始调用");
    this.getCompetence()
  },
  destroyed() {
    this.stopNavigator()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$emit('refreshDataList', res.data.url)
    },
    // 调用权限（打开摄像头功能）
    getCompetence() {
      // this.$toast("开始111111111111111111111");
      var _this = this
      this.thisCanvas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCanvas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        // this.$toast("开始2222222222");
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        // this.$toast("开始3333333333");
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, facingMode:'user', transform: 'scaleX(-1)' } }
      navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log("err:----", err);
        this.$toast(err);
      })
    },
    //  绘制图片（拍照功能）
    setImage() {
      var _this = this
      _this.thisCanvas.style.visibility = "visible";
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      var image = _this.thisCanvas.toDataURL('image/png')
      console.log(image)
      _this.imgSrc = image
      const file = image
      const time = (new Date()).valueOf()
      const name = time
      const conversions = _this.base64ToFile(file, name)
      console.log("conversions",conversions)
      const data = new FormData()
      data.append('file', conversions)
      _this.fileUrl = image
      _this.complete_photo = true;
      // uploadImg(data).then(res => {
      //   if (res.data.code == 0) {
      //     this.$emit('refreshDataList', res.data.data.url)
      //   }
      // })
    },
    // base64图片转file的方法（base64图片, 设置生成file的文件名）
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
    // 重拍
    reset() {
      this.thisCanvas.style.visibility = "hidden"
      this.complete_photo = false
    },
    // 发布内容
    aDiary() {
      router.push({name:"postphoto",query: {file: this.fileUrl}});
    },
    aChallgame(){
      this.$emit('refreshDataList', this.fileUrl);
    },
    // 分享范围
    share() {
      this.shareRange = true;

    },
    // 关闭摄像头
    stopNavigator() {
      // this.thisVideo.srcObject.getTracks()[0].stop()
    }
  }
}

</script>
<style lang="less" scoped>
.capture{
  position: relative;
  margin:0 auto;
  width:350px;
  top: 10%;
}
#canvasCamera {
  position: absolute;
  visibility: hidden;
  border-radius: 4%;
  margin:0 auto;
  display:block;
  z-index: 1;
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
}

.button_container{
  display: flex;
  justify-content: center;
  width:100%;
  margin:0.8rem 0;
}
.camera_outer {
  position: relative;
  overflow: hidden;
  // background: url("../../assets/img/user_0608_04.png") no-repeat center;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;


  justify-content: space-between;

  video {
    border-radius: 4%;
    -webkit-backface-visibility: hidden;
    // -webkit-transform: translate3d(0, 0, 0);
    transform: scaleX(-1);
    // -webkit-transform: translate3d(0, 0, 0);
    transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
  }



  /deep/ .mint-field.is-textarea {
    width: 90%;
  }

  .btn_camera {
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }

  .bg_r_img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .img_bg_camera {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;

    img {
      width: 300px;
      height: 300px;
    }

    .img_btn_camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      color: #ffffff;

      .loding_img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
