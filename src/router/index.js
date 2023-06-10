import Vue from 'vue'
import Router from 'vue-router'
import login from "@/pages/user/login"
import register from "@/pages/user/register"
import main from "@/pages/user/main"
import notice from "@/pages/user/notice"
import setting from "@/pages/user/setting"
import friend from "@/pages/user/friend"
import mydiary from '@/pages/user/mydiary'
import photo from "@/pages/photo/photo"
import postphoto from "@/pages/photo/postphoto"
import explore from '@/pages/explore/explore'
import fight from '@/pages/fight/fight'
import post from '@/pages/fight/post'
import detail from '@/pages/fight/detail'
import gdetail from '@/pages/game/detail'
import finvolved from '@/pages/fight/involved'
import freleased from '@/pages/fight/released'
import ginvolved from '@/pages/game/involved'
import greleased from '@/pages/game/released'
import gtorelease from '@/pages/game/torelease'
import game from '@/pages/game/game'

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
      path: '/postphoto',
      name: 'postphoto',
      component: postphoto
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
        // {
        //   path: 'gift', 
        //   name: 'gift',
        //   component: gift,
        // },
        
      ],
    },

    {
      path: '/post', 
      name: 'post',
      component: post,
    },
    {
      path: '/detail', 
      name: 'detail',
      component: detail,
    },
    {
      path: '/gdetail', 
      name: 'gdetail',
      component: gdetail,
    },
    {
      path: '/freleased', 
      name: 'freleased',
      component: freleased,
    },
    {
      path: '/finvolved', 
      name: 'finvolved',
      component: finvolved,
    },
    {
      path: '/greleased', 
      name: 'greleased',
      component: greleased,
    },
    {
      path: '/ginvolved', 
      name: 'ginvolved',
      component: ginvolved,
    },
    {
      path: '/gtorelease', 
      name: 'gtorelease',
      component: gtorelease,
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
    {
      path: '/mydiary', 
      name: 'mydiary',
      component: mydiary,
    },
  ]
})
