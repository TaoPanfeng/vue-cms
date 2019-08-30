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
/*App.vue*/
import app from './App.vue'

new Vue({
    el: "#app",
    render: c => c(app),
    router
});