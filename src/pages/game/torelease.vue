<template>
  <div class="postphoto">
    <van-nav-bar :title=titleList[postType]  left-arrow @click-left="$router.back()" safe-area-inset-top/>
    
    <div class = "container">
      <capture @refreshDataList="refreshDataList" />
      <div class = "content_container" >
          <van-field
              v-model="message"
              rows="4"
              autosize
              type="textarea"
              placeholder="请输入留言"
              show-word-limit
              maxlength="150"
              :clearable = "clearable"
              />
      </div>
      <!-- <calendar-heatmap start-date="2023-03-01" :vert"ical="true" end-date="2023-04-01" :values="timeValue" :range-color='rangeColor' tooltip-unit="こんとりびゅーと" @day-click="someMethod"/> -->
      <!-- <div ref="chartColumn" style="width:100%; height:400px;"></div> -->
      <div class="image_container">
          <van-badge :color="moodColor[emotion]" >
              <van-image
                  radius = 6
                  :src="file"
                  width="2.8rem"
                  height="2.8rem"
                  fit="cover" @click="preview()"/>
              <template #content>
                  
                  <i :class="moodIcon[emotion]" style = "font-size:0.5rem;margin: 0.1rem 0.1rem;"></i>
                  <i style="font-size:0.4rem;font-style: inherit;"> {{ emotion_strength }}</i>
                  
              </template>
          </van-badge>
      </div>
      <van-cell  title="挑战类型" :value="moodtype[fightvalue]" @click="showPicker = true" is-link />
      <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="moodtype" @cancel="showPicker = false" @confirm="saveFightType" />
      </van-popup>
      <van-field name="switch" label="提醒好友">
      <template #input>
          <van-switch v-model="switchChecked" size="20" />
      </template>
      </van-field>
      <van-button type="primary" block style="position: fixed;bottom: 0px;" color = var(--mydarkblue)>发布</van-button>
    </div>
  </div>
</template>

<script>
import { CalendarHeatmap } from "vue-calendar-heatmap";
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import capture from '@/components/capture/capture';
import filePopup from '@/components/filePopup/filePopup'
import { Dialog,ImagePreview } from 'vant';
import axios from "axios";
export default {
  name: "ftorelease",
  data() {
      return {
      

      chartColumn: null,
      switchChecked: false,
      clearable:true,
      message:'',
      emotion:3,
      emotion_strength:40,
      moodColor:['rgb(255,150,178)','rgb(75,167,133)','rgb(122,162,255)','rgb(255,202,43)','rgb(28,196,233)','rgb(243,109,66)','rgb(124,225,0)'],
      moodIcon:['iconfont icon-surprise','iconfont icon-ghost-fill','iconfont icon-confused2','iconfont icon-happy-face','iconfont icon-sad-f','iconfont icon-angry2','iconfont icon-neutral-face'],
      user: JSON.parse(localStorage.getItem("user")),
      headerLeftStatus: false,
      file : this.$route.query.file,
      
      showPicker: false,
      
      titleList:["发布挑战","发布游戏"],
      //挑战
      postType:this.$route.query.postType,
      moodtype: ["Surprise", "Fear", "Disgusted", "Happy", "Sad", "Angry", "Neutral"],
      fightvalue: 0,

      //游戏

      };
},
components: {
  "v-header": header,
  "v-footer": footer,
  CalendarHeatmap,
  capture,
  [ImagePreview.Component.name]: ImagePreview.Component,
  // CalendarHeatmap
},
methods: {
  refreshDataList(imgSrc) {
    // 这里返回服务器图片的地址
    console.log(imgSrc)
  },
  // searchInfoData() {
  //   let self = this;
  //   console.log(self.user.user_id)
  //   // `http://10.128.245.71:5000/moodland/${user.avatar}`
  //   axios.get(process.env.VUE_APP_SERVER_URL +`/moodland/user/user/${self.user.user_id}`).then(function (response) {
  //     //成功时服务器返回 response 数据
  //     self.user = response.data;
  //     console.log(self.user);
  //     // 如果为空，将user头像改为login中存储的,不为空则处理一下传回的avatar路径
  //     if(response.data.avatar===""){
  //       self.user.avatar=localStorage.getItem("user").avatar;
  //     }else{
  //       self.user.avatar=process.env.VUE_APP_SERVER_URL +`/moodland/${self.user.avatar}`;
  //     }
  //     // 并将user的新数据保存
  //     localStorage.setItem("user", JSON.stringify(self.user))
  //     console.log("response.data",response.data)
  //     // console.log("localStorage",localStorage.getItem("user"))
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // },

  saveFightType(value) {
      console.log(value);
      for (var i=0;i<this.moodtype.length;i++){
          if(value==this.moodtype[i]){
              this.fightvalue = i;
              break;
          }
      }
    
    this.showPicker = false;
  },

  jumpToOthers(link) {
    router.push(link);
  },

  preview(){
      ImagePreview({
          images: [
              this.file,
          ],
          closeable: true,
      });
  },
  
},
mounted: function () {
  //使用h5的读取文件api
  // var reader = new FileReader();
  //     reader.readAsDataURL(this.file);
  //     //读取完成后触发
  //     reader.onload = function () {
  //     //改变img的路径
  //         document.querySelector("van-image").src = this.result;
  //     };
  
},


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


  .image_container{
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