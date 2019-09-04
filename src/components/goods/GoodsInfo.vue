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

        <!--参数-->
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import swipe from '../subcomponents/Swipe.vue'

    export default {
        data()
        {
            return {
                goods_id: this.$route.params.goods_id,/*接收到url中的值*/
                lunbotu_list: [],/*轮播图集合*/
                goods_info: {}/*商品对象*/
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
            "swipe_component": swipe
        }
    }
</script>

<style lang="scss" scoped>
    .goods_info_container
    {

    }
</style>