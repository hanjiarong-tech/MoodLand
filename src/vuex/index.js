import Vue from 'vue'
import Vuex from 'vuex'
import {
    ADD_ADDRESS,
    DEL_ADDRESS,
    SET_DEFAULT
} from './mutations-type'
import cart from './modules/cart'
import order from './modules/order'
import { Toast, MessageBox } from 'mint-ui'
import router from '../router';
Vue.use(Vuex)

const state = {
    userInfo:{}
}

const mutations = {

}

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        cart,
        order
    }
})

