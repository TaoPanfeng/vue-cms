<template>
    <div class="goods_info_container">
        <!--轮播-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swipe_component :lunbotu_list="lunbotu_list" :is_full="false"></swipe_component>
                </div>
            </div>
        </div>

        <!--购买-->
        <div class="mui-card">
            <div class="mui-card-header">{{ goods_info.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span class="now_price">￥{{ goods_info.sell_price }}</span>
                        <p class="old_price">
                            <span>原价:</span>
                            <del>￥{{ goods_info.market_price }}</del>
                        </p>
                    </div>
                    <p>购买数量:
                        <number_component></number_component>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!--参数-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{ goods_info.goods_no }}</p>
                    <p>库存情况:{{ goods_info.stock_quantity }}件</p>
                    <p>上架时间:{{ goods_info.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swipe from '../subcomponents/Swipe.vue'
    import number from '../subcomponents/Number.vue'

    export default {
        data()
        {
            return {
                goods_id: this.$route.params.goods_id,/*接收到url中的值*/
                lunbotu_list: [],/*轮播图集合*/
                goods_info: {},/*商品对象*/
            }
        },
        created()
        {
            this.get_goods_info();
            this.get_lunbotu_list();
        },
        methods: {
            get_lunbotu_list()
            {
                this.$http.get("/api/getthumimages/" + this.goods_id).then(result =>
                {
                    /*先添加img属性,因为轮播图组件中只用了img*/
                    result.data.message.forEach(lunbotu =>
                    {
                        lunbotu.img = lunbotu.src;
                    });
                    this.lunbotu_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取轮播图数据失败...");
                });
            },
            get_goods_info()
            {
                this.$http.get("/api/goods/getinfo/" + this.goods_id).then(result =>
                {
                    this.goods_info = result.data.message[0];
                }).catch(() =>
                {
                    Toast("获取商品详情数据失败...");
                });
            }
        },
        components: {
            "swipe_component": swipe,
            "number_component": number
        }
    }
</script>

<style lang="scss" scoped>
    .goods_info_container
    {
        background-color: #eee;
        overflow: hidden;/*移除此div的内容隐藏*/
        .price .now_price
        {
            color: red;
            font-size: 16px;
            font-weight: bold; /*字体加粗*/
        }

        .mui-card-footer
        {
            /*此元素将显示为块级元素,此元素前后会带有换行符*/
            /*设置之后 图文介绍 和 商品评论 上下排列*/
            display: block;

            .mint-button
            {
                margin: 10px 0; /*外边距:上下10px 左右0*/
            }

        }
    }
</style>