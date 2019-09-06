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

new Vue({
    el: "#app",
    render: c => c(App),
    router
});