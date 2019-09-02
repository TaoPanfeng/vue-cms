/*Vue*/
import Vue from 'vue'
/*VueRouter*/
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
/*axios*/
import axios from 'axios'

Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://www.liulongbin.top:3005";/*设置根路径*/
/*App.vue*/
import app from './App.vue'
/*导入moment格式化时间的插件*/
import moment from 'moment'
/*定义全局的过滤器*/
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss")
{
    return moment(dataStr).format(pattern)
});

/*图片的点击放大*/
import Viewer from 'v-viewer'

Vue.use(Viewer);
import 'viewerjs/dist/viewer.css'

new Vue({
    el: "#app",
    render: c => c(app),
    router
});