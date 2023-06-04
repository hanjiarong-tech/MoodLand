<template>
  <div id="bottom">
    <ul class="bottom-ul"> 
      <router-link :to="{ path: '/photo' }" tag="li">
          <i class="iconfont icon-shouyexuanzhong" style="color:var(--theme-color)" v-if="$route.path === '/photo' || $route.path === '/'"></i>
          <i class="iconfont icon-shouye1" style = "color:var(--mydarkblue)" v-else></i>
          <span :style="$route.path ==='/photo' || $route.path ==='/'  ? 'color: var(--theme-color) ': 'color: var(--mydarkblue)'">首页</span>
      </router-link>

      <!-- <router-link :to="{ path: '/classify' }" tag="li">
        <div class="index">
          <i class="iconfont icon-fenleixuanzhong" style="color:var(--theme-color)" v-if="$route.path === '/classify'"></i>
          <i class="iconfont icon-fenlei-copy" v-else></i>
        </div>
        <span :style="$route.path ==='/classify' ? 'color: var(--theme-color) ': 'color: var(--mydarkblue)'">分类</span>
      </router-link> -->

      <router-link :to="{ path: '/explore' }" tag="li">
        <i class="iconfont icon-tansuoxuanzhong" style="color:var(--theme-color)" v-if="$route.matched[0].path=='/explore'"></i>
        <i class="iconfont icon-tansuo" style = "color:var(--mydarkblue)" v-else></i>
        <span :style="$route.matched[0].path=='/explore' ? 'color: var(--theme-color) ': 'color: var(--mydarkblue)'">探索</span>
      </router-link>

       <router-link :to="{ path: '/main' }" tag="li">
        <i class="iconfont icon-wodexuanzhong" style="color:var(--theme-color)" v-if="$route.path ==='/main'"></i>
        <i class="iconfont icon-wode" style = "color:var(--mydarkblue)" v-else></i>
        <span :style="$route.path ==='/main' ? 'color: var(--theme-color) ': 'color: var(--mydarkblue)'">我的</span>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
 @import url("index.less");
</style>