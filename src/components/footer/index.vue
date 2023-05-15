<template>
  <div id="bottom">
    <ul class="bottom-ul"> 
      <router-link :to="{ path: '/photo' }" tag="li">
          <i class="iconfont icon-shouye" style="color:#179dfe" v-if="$route.path === '/photo' || $route.path === '/'"></i>
          <i class="iconfont icon-shouye" v-else></i>
          <span :style="$route.path ==='/photo' || $route.path ==='/'  ? 'color: #179DFE ': 'color: #666'">首页</span>
      </router-link>

      <!-- <router-link :to="{ path: '/classify' }" tag="li">
        <div class="index">
          <i class="iconfont icon-fenleixuanzhong" style="color:#179dfe" v-if="$route.path === '/classify'"></i>
          <i class="iconfont icon-fenlei-copy" v-else></i>
        </div>
        <span :style="$route.path ==='/classify' ? 'color: #179DFE ': 'color: #666'">分类</span>
      </router-link> -->

      <router-link :to="{ path: '/explore/fight' }" tag="li">
        <i class="iconfont icon-tansuo" style="color:#179dfe" v-if="$route.matched[0].path=='/explore'"></i>
        <i class="iconfont icon-tansuo" v-else></i>
        <span :style="$route.matched[0].path=='/explore' ? 'color: #179DFE ': 'color: #666'">探索</span>
      </router-link>

       <router-link :to="{ path: '/main' }" tag="li">
        <i class="iconfont icon-31wode" style="color:#179dfe" v-if="$route.path ==='/main'"></i>
        <i class="iconfont icon-31wode"  v-else></i>
        <span :style="$route.path ==='/main' ? 'color: #179DFE ': 'color: #666'">我的</span>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
 @import url("index.less");
</style>