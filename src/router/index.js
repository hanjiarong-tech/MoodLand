import Vue from 'vue'
import Router from 'vue-router'
import login from "@/pages/user/login"
import register from "@/pages/user/register"
import main from "@/pages/user/main"
import notice from "@/pages/user/notice"
import setting from "@/pages/user/setting"
import friend from "@/pages/user/friend"
import photo from "@/pages/photo/photo"
import explore from '@/pages/explore/explore'
import fight from '@/pages/fight/fight'
import game from '@/pages/game/game'
import gift from '@/pages/gift/gift'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/photo',
      name: 'photo',
      component: photo
    },
    {
      path: '/explore',
      redirect: '/explore/fight/'
    },
    {
      path: '/explore',
      name: 'explore',
      component: explore,
      children: [
        {
          path: 'fight', // 视频页面路由
          name: 'fight',
          component: fight,
        },
        {
          path: 'game', // 视频页面路由
          name: 'game',
          component: game,
        },
        {
          path: 'gift', // 视频页面路由
          name: 'gift',
          component: gift,
        },
        
      ],
    },
    {
      path: '/main',
      name: 'main',
      component: main,
    },
    {
      path: '/notice', // 视频页面路由
      name: 'notice',
      component: notice,
    },
    {
      path: '/setting', // 视频页面路由
      name: 'setting',
      component: setting,
    },
    {
      path: '/friend', // 视频页面路由
      name: 'friend',
      component: friend,
    },
  ]
})
