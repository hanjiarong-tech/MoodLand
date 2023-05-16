<template>
  <div class="setting">
    <!-- <v-header title="设置" :headerLeftStatus="headerLeftStatus" :save="save" /> -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()"  />
    <div class="content">
      <van-cell @click="openAvatar" title="头像" is-link>
        <template #default>
          <img :src="avatar" style="width:30px; height:30px;border-radius: 50%;" alt="用户头像">
        </template>
      </van-cell>
      <van-cell @click="nameshow = true" title="昵称" :value="namevalue" is-link />
      <van-cell title="性别" :value="gendervalue === 0 ? '男' : '女'" @click="showPicker = true" is-link />
      <van-popup v-model:show="showPicker" round position="bottom" >
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="saveGender"
        />
      </van-popup>
      <!-- 修改用户昵称弹出层 -->
      <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
        <van-field v-model="namevalue" center clearable label="用户名" placeholder="请输入用户名" >
        <template #button>
            <van-button size="small" @click="saveName()" type="primary">保存</van-button> </template>
      </van-field>
    </van-popup>
   
     

      <!-- 导入修改头像子组件 -->
      <filePopup ref="avatarRef" />
      <van-cell center title="提醒开关">
        <template #right-icon>
          <van-switch :value="checked" @input="onInput" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import header from '@/components/header/index'
import footer from '@/components/footer/index'
import filePopup from '@/components/filePopup/filePopup'
import { Dialog } from 'vant';
import axios from "axios";
export default {
  data() {
    return {
      headerLeftStatus: true,
      checked: true,
      avatar:"../../../static/img/头像.jpg",
      nameshow: false,
      namevalue:"123",
      gendervalue:'0',
      showPicker:false,
      columns: ['男', '女'],
      
    };
  },
  mounted() {
  },
  methods: {
    onInput(checked) {
      Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？',
      }).then(() => {
        this.checked = checked;
      });
    },
    searchInfoData() {
      // let self = this;
      // console.log(123);
      // axios.post('http://10.128.245.71:5000/moodland/notice/' + 123456, {
      //   content: "123",
      //   has_read: 0,
      //   notice_id: 1,
      //   notice_url: 0,
      //   notice_type: 1,
      // }).then(function (response) {
      //   //成功时服务器返回 response 数据
      //   console.log(response.data)
      // }).catch(function (error) {
      //   console.log(error);
      // });
    },
    saveName(){
      this.nameshow=false;
      // this.namedata=this.namevalue;
    },
    saveGender(value) {
      if(value==='男'){
        this.gendervalue = 0;
      }else{
        this.gendervalue = 1;
      }
      this.showPicker = false;
    },
    save() {
      // let self = this;
      // console.log(123);
      // axios.post('http://10.128.245.71:5000/moodland/notice/' + 123456, {
      //   content: "123",
      //   has_read: 0,
      //   notice_id: 1,
      //   notice_url: 0,
      //   notice_type: 1,
      // }).then(function (response) {
      //   //成功时服务器返回 response 数据
      //   this.$toast.success('修改成功')
      // }).catch(function (error) {
      //   this.$toast.success('修改失败')
      // });
    },
    openAvatar(){
      this.$refs.avatarRef.show=true;
    },
  },
    components: {
      "v-header": header,
      "v-footer": footer,
      "filePopup":filePopup
    },
    mounted: function () {
      this.searchInfoData();
    }
  }
</script>

<style scoped>
.content {
  top: auto;
  position: absolute;
  width: 100%;
}
.setting{
  background-color: white;
  height:100vh

}
</style>

