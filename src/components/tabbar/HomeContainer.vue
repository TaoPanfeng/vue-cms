<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="1000">
            <mt-swipe-item v-for="(lunbotu,index) in lunbotu_list" :key="index">
                <img :src="lunbotu.img">
            </mt-swipe-item>
        </mt-swipe>
        <!--六宫格-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png">
                <div class="mui-media-body">图片分享</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png">
                <div class="mui-media-body">商品购买</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png">
                <div class="mui-media-body">留言反馈</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png">
                <div class="mui-media-body">视频专区</div>
            </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png">
                <div class="mui-media-body">联系我们</div>
            </a></li>
        </ul>
        <h3>HomeContainer</h3>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                lunbotu_list: []// 保存轮播图的数组
            }
        },
        created()
        {
            this.get_lunbotu_data();
        },
        methods: {
            get_lunbotu_data()// 获取轮播图数据的方法
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
        }
    }
</script>

<!--lang设置为scss样式,scoped设置自己组件可用-->
<style lang="scss" scoped>
    .mint-swipe /*设置轮播图*/
    {
        height: 200px; /*高度:200,不然不显示,默认为0了*/
        .mint-swipe-item img
        {
            width: 100%;
            height: 100%;
        }
    }

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
</style>