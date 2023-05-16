import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import echarts from 'echarts'
// 滑动特效插件
import VueSwiper from 'vue-awesome-swiper';
// import 'swiper/swiper-bundle.css';
import { Navbar, TabItem } from 'mint-ui';
import { Grid, GridItem,Card } from 'vant';
import { Switch } from 'vant';
import { Dialog } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup } from 'vant';
import { showConfirmDialog } from 'vant';
import { Field,Picker} from 'vant';
import { Badge } from 'vant';
import { ImagePreview, Tab, Tabs} from 'vant';
//注册
//icon
Vue.use(Field,ImagePreview,Picker,Badge,Tab,Tabs)
Vue.use(Popup)
Vue.use(VueCalendarHeatmap)
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.component(Navbar.name, Navbar,Switch);
Vue.component(TabItem.name, TabItem);
Vue.use(VueSwiper);
Vue.use(Vant);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.use(VueLazyLoad,{
  loading:require("../static/img/头像.jpg")
})
//引入UI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// axios.defaults.baseURL = '/api'

router.beforeEach((to,from,next) => { 
  if(to.meta.requireAuth) {
    if(!localStorage.getItem('user')) {
      next({path:'/login'})
    }
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
