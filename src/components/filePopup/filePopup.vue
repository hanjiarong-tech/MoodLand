<template>
  <div class="file">
    <van-popup v-model="show" round position="bottom" :style="{ height: '15%' }" >
      <div class="updateAva">
        <div @click="openFile">从相册中选择</div>
        <input @change="changImg" ref="inputFileRef" type="file" style="display: none;">
        <div class="borderDiv">拍照</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import * as CommentData from '@/api/mockdata';
import { ImagePreview } from 'vant';
export default {
  name: "filePopup",
  data() {
    return {
      show:false
    };
  },
  created() {

  },
  props: {
  },
  methods: {
    openFile() {
      this.$refs.inputFileRef.click()
    },
    changImg(){
      this.show=false
      let that=this
      const file=this.$refs.inputFileRef.files[0]
      var reader=new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load',function(){
        ImagePreview({
          images:[
            reader.result
          ],
          closeable: true,
          onClose:that.closeProcess,
        })
      })
    },
    closeProcess(){
      this.$dialog.confirm({
        title:'提示',
        message:'确定要修改头像吗'
      }).then(async()=>{
        // 得到图片
        const path=this.$refs.inputFileRef.files[0]
      // 发送图片对象
      // const fd=new FormData()
      // fd.append('photo',path)
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
      //   this.$parent.userData.photo=response.data.photo //修改setting显示的头像
      // }).catch(function (error) {
      //   this.$toast.success('修改失败') 
      // });

      })
    }

  },
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.updateAva{
  height:100%;
  display:flex;
  align-items: center;
  flex-direction: column;
  justify-content:space-around;
}
</style>