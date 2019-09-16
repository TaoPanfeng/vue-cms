/*Vue*/
import Vue from 'vue'
/*VueRouter 路由*/
import VueRouter from 'vue-router'

Vue.use(VueRouter);
import router from './router.js'
/*Mint UI*/
import MintUI from 'mint-ui'

Vue.use(MintUI);
import 'mint-ui/lib/style.css'
/*MUI*/
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
/*axios http请求*/
import axios from 'axios'

Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://www.liulongbin.top:3005";/*设置根路径*/
/*App.vue 组件*/
import App from './App.vue'
/*moment 格式化时间的插件*/
import moment from 'moment'
/*filter 定义全局的过滤器*/
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss")
{
    return moment(dataStr).format(pattern)
});

/*v-viewer 图片的点击放大*/
import Viewer from 'v-viewer'

Vue.use(Viewer);
import 'viewerjs/dist/viewer.css'

/*vuex 多个组件传值*/
import Vuex from 'vuex'

Vue.use(Vuex);
const cart = JSON.parse(localStorage.getItem("VUE_CMS_CART")) || [];
let store = new Vuex.Store({
    state: {
        goods_list: cart
    },
    mutations: {
        update_store(state, goods_list)
        {
            state.goods_list = goods_list;
            localStorage.setItem("VUE_CMS_CART", JSON.stringify(goods_list));
        }
    },
    getters: {
        get_cart_all_count(state)
        {
            let count = 0;
            state.goods_list.forEach(goods =>
            {
                count += parseInt(goods.count);
            });
            return count;
        },
        get_total_count(state)
        {
            let count = 0;
            state.goods_list.forEach(goods =>
            {
                if (goods.selected === true)
                {
                    count += parseInt(goods.count);
                }
            });
            return count;
        },
        get_total_price(state)
        {
            let price = 0;
            state.goods_list.forEach(goods =>
            {
                if (goods.selected === true)
                {
                    price += parseInt(goods.count * goods.price);
                }
            });
            return price;
        }
    }
});

new Vue({
    el: "#app",
    render: c => c(App),
    router,
    store
});