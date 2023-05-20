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
import finvolved from '@/pages/fight/involved'
import released from '@/pages/fight/released'
import ftorelease from '@/pages/fight/torelease'
import game from '@/pages/game/game'
import gift from '@/pages/gift/gift'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
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
          path: 'fight', 
          name: 'fight',
          component: fight,
        },

        {
          path: 'game', 
          name: 'game',
          component: game,
        },
        {
          path: 'gift', 
          name: 'gift',
          component: gift,
        },
        
      ],
    },
    {
      path: '/freleased', 
      name: 'freleased',
      component: released,
    },
    {
      path: '/finvolved', 
      name: 'finvolved',
      component: finvolved,
    },
    {
      path: '/ftorelease', 
      name: 'ftorelease',
      component: ftorelease,
    },
    {
      path: '/main',
      name: 'main',
      component: main,
    },
    {
      path: '/notice', 
      name: 'notice',
      component: notice,
    },
    {
      path: '/setting', 
      name: 'setting',
      component: setting,
    },
    {
      path: '/friend', 
      name: 'friend',
      component: friend,
    },
  ]
})
