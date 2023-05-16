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
  background: #fff;
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
   }
</style>
