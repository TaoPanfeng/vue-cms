import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import CartContainer from './components/tabbar/CartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'

export default new VueRouter({
    //匹配设置路由规则
    routes:
        [
            {path: "/", redirect: "/home"},
            {path: "/home", component: HomeContainer},
            {path: "/member", component: MemberContainer},
            {path: "/cart", component: CartContainer},
            {path: "/search", component: SearchContainer},
            {path: "/home/newslist", component: NewsList},
        ],
    // 会覆盖叫 router-link-active 默认的类
    linkActiveClass: 'mui-active'
})