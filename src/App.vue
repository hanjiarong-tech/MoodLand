<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import rem from './rem/rem.js'

export default {
  name: 'app',
   data(){
    return{
     
    }
  },
}
</script>

<style>
 @import 'styles/style.css';
 @import './fon/iconfont.css';
body{
  background:linear-gradient(to bottom, #70e1f570  0%, rgb(248,249,237)  40%,#fcf5ea70  70%);
  /*background: #C6FFDD;  /* fallback for old browsers */
  /*background: -webkit-linear-gradient(to bottom, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  /*background: linear-gradient(to bottom, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  height:100vh;
}
         
         

.mint-swipe-indicator{
  background: #000;
  border: 1px solid black
}
.mint-swipe-indicator.is-active{
  background: #ddd;
}

:root {
   --yellow: #c2c420;
   --middle-gray:#737171;
   --light-gray:#959595;
   --deep-gray:#565656;
   --mygreen:rgb(80,125,135);
   --mydarkblue:rgb(43,79,106);
   --background-gray:rgb(245, 245, 245);
   }
</style>
