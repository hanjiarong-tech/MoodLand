import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import VueLazyLoad from 'vue-lazyload'
// import VueStar from 'vue-star'
import { RadioGroup, Radio } from 'vant';
import axios from 'axios';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import echarts from 'echarts'
// 滑动特效插件
import VueSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import { Navbar, TabItem } from 'mint-ui';
import { Grid, GridItem,Card,Tab, Tabs,Divider,Tag,Uploader,Search } from 'vant';
import { Switch } from 'vant';
import { Dialog } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Popup,Toast } from 'vant';
import { showConfirmDialog } from 'vant';
import { Field,Picker} from 'vant';
import { Badge } from 'vant';
import { ImagePreview} from 'vant';
import { Skeleton } from 'vant';
import { Calendar } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import VueStarPlus from 'vue-star-plus' // same with vue3 version
import 'vue-star-plus/lib/style.css'  // same with vue3 version
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.component('VueStarPlus', VueStarPlus)
// Vue.component('VueStar', VueStar)
Vue.use(Skeleton);
Vue.use(Calendar);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Field,ImagePreview,Picker,Badge,Tab,Tabs,Divider,Tag,Uploader,Search)
Vue.use(Popup,Toast)
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
Vue.use(Tab);
Vue.use(Tabs);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$toast = Toast
Vue.use(VueLazyLoad,{
  loading:require("../static/img/avatar.svg")
})

//引入UI组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

// axios.defaults.baseURL = '/api'

// router.beforeEach((to,from,next) => { 
//   if(to.meta.requireAuth) {
//     if(!localStorage.getItem('user')) {
//       next({path:'/login'})
//     }
//   }
//   next()
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
