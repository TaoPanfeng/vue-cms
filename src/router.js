import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import CartContainer from './components/tabbar/CartContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PictureList from './components/picture/PictureList.vue'
import PictureInfo from './components/picture/PictureInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDescription from './components/goods/GoodsDescription.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

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
            {path: "/home/newsinfo/:news_id", component: NewsInfo},
            {path: "/home/picturelist", component: PictureList},
            {path: "/home/pictureinfo/:picture_id", component: PictureInfo},
            {path: "/home/goodslist", component: GoodsList},
            {path: "/home/goodsinfo/:goods_id", component: GoodsInfo},
            {path: "/home/goodsdescription/:goods_id", component: GoodsDescription, name: "goodsdescription"},
            {path: "/home/goodscomment/:goods_id", component: GoodsComment, name: "goodscomment"},
        ],
    // 会覆盖叫 router-link-active 默认的类
    linkActiveClass: 'mui-active'
})