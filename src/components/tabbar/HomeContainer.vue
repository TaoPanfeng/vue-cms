<template>
    <div class="home_container">
        <!--轮播图-->
        <swipe_component :lunbotu_list="lunbotu_list"></swipe_component>

        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/picturelist">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>
        <h3>HomeContainer</h3>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swipe from '../subcomponents/Swipe.vue'

    export default {
        data()
        {
            return {
                lunbotu_list: []/*轮播图集合*/
            }
        },
        created()
        {
            this.get_lunbotu_list();
        },
        methods: {
            get_lunbotu_list()// 获取轮播图数据的方法
            {
                this.$http.get("/api/getlunbo").then(result =>
                {
                    // console.log(result);//打印请求结果
                    this.lunbotu_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取轮播图数据失败...");
                });
            }
        },
        components: {
            "swipe_component": swipe
        }
    }
</script>

<!--lang设置为scss样式,scoped设置自己组件可用-->
<style lang="scss" scoped>
    .home_container
    {
        .mui-grid-view.mui-grid-9
        {
            background-color: white; /*设置六宫格,背景颜色:白色*/
            .mui-table-view-cell
            {
                border: none; /*设置六宫格,无边框*/
                img
                {
                    width: 60px;
                    height: 60px;
                }

                div
                {
                    font-size: 12px;
                }
            }
        }
    }
</style>