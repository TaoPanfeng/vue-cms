<template>
    <div class="goods_list_container">
        <router-link class="goods" :to="'/home/goodsinfo/'+goods.id" tag="div"
                     v-for="(goods,index) in goods_list" :key="index">
            <img :src="goods.img_url">
            <h1 class="title">{{goods.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now_price">￥{{goods.sell_price}}</span>
                    <span class="old_price">￥{{goods.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{goods.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>

        <mt-button type="danger" size="large" plain @click="get_more_goods">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                goods_list: [],/*商品集合*/
                page_number: 1,/*默认 第一页*/
            }
        },
        created()
        {
            this.get_goods_list_by_page_number();
        },
        methods: {
            get_goods_list_by_page_number()
            {
                this.$http.get("/api/getgoods?pageindex=" + this.page_number).then(result =>
                {
                    /* concat , 合并数组 */
                    this.goods_list = this.goods_list.concat(result.data.message);
                }).catch(() =>
                {
                    Toast("获取商品数据失败...");
                });
            },
            get_more_goods()
            {
                this.page_number++;
                this.get_goods_list_by_page_number();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goods_list_container
    {
        display: flex; /*设置flex布局,两个商品时会左右排列*/
        flex-wrap: wrap; /*让弹性盒元素在必要的时候拆行*/
        padding: 8px;
        justify-content: space-between;

        .goods
        {
            width: 49%; /*设置宽度之后,.goods_list_container的flex-wrap会一行加载两个*/
            border: 1px solid #ccc; /*给边缘加 1px 实线 颜色*/
            box-shadow: 0 0 8px #ccc; /*阴影设置: x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column; /*灵活的项目将垂直显示,正如一个列一样(竖着对齐)*/
            justify-content: space-between; /*项目位于各行之间留有空白的容器内*/
            min-height: 293px; /*设置段落的最低高度*/

            img
            {
                width: 100%;
            }

            .title
            {
                font-size: 14px;
            }

            .info
            {
                background-color: #eee;

                p
                {
                    margin: 0;
                    padding: 5px;
                }

                .price
                {
                    .now_price
                    {
                        color: red;
                        font-weight: bold; /*字体加粗*/
                        font-size: 16px;
                    }

                    .old_price
                    {
                        text-decoration: line-through; /*定义穿过文本下的一条线。*/
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell
                {
                    /*display: flex;*/
                    /*justify-content: space-between;*/
                    /*font-size: 13px;*/
                }
            }
        }
    }
</style>