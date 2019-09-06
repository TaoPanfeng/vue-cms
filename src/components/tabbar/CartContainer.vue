<template>
    <div class="cart_container">

        <!--购物车列表-->
        <div class="cart_list">
            <div class="mui-card" v-for="(goods,index) in goods_list" :key="index">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="goods_list[index].selected" @change="select_change"></mt-switch>
                        <img :src="goods.img">
                        <div class="goods_info">
                            <h1>{{goods.title}}</h1>
                            <p>
                                <span class="price">¥{{goods.count * goods.price}}</span>
                                <cart_number_component @update_cart="load_cart"
                                                       :goods="goods"></cart_number_component>
                                <a href="#" @click="delete_cart(index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--结算-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner pay">
                    <div class="left">
                        <span>合计:</span>
                        <span class="total_price">¥{{total_price}}</span>
                    </div>
                    <mt-button type="danger" @click="pay">结算({{total_count}})</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import CartNumber from '../subcomponents/CartNumber.vue'

    export default {
        data()
        {
            return {
                goods_list: []
            }
        },
        created()
        {
            this.load_cart();
        },
        methods: {

            load_cart()
            {
                this.goods_list = JSON.parse(localStorage.getItem("VUE_CMS_CART")) || [];
                if (this.goods_list.length === 0)
                    Toast("购物车暂无商品...");
            },
            delete_cart(index)
            {
                this.goods_list.splice(index, 1);
                localStorage.setItem("VUE_CMS_CART", JSON.stringify(this.goods_list));
                this.load_cart();
            },
            pay()
            {
                if (this.total_count === 0)
                {
                    Toast("请选择要结算的商品...")
                } else
                {
                    Toast("支付宝到账 " + this.total_price + " 元...");
                    this.goods_list = JSON.parse(localStorage.getItem("VUE_CMS_CART")).filter(g =>
                    {
                        return g.selected === false;
                    });
                }

            },
            select_change()
            {
                localStorage.setItem("VUE_CMS_CART", JSON.stringify(this.goods_list));
                this.load_cart();
            }
        },
        computed: {
            total_count()
            {
                let count = 0;
                this.goods_list.forEach(goods =>
                {
                    if (goods.selected === true)
                    {
                        count += parseInt(goods.count);
                    }
                });
                return count;
            },
            total_price()
            {
                let price = 0;
                this.goods_list.forEach(goods =>
                {
                    if (goods.selected === true)
                    {
                        price += parseInt(goods.count * goods.price);
                    }
                });
                return price;
            }
        },
        components: {
            "cart_number_component": CartNumber
        }
    }
</script>

<!--lang设置为scss样式,scoped设置自己组件可用-->
<style lang="scss" scoped>
    .cart_container
    {
        background-color: #eeeeee;
        overflow: hidden; /*溢出隐藏*/
        .cart_list
        {
            .mui-card-content-inner
            {
                display: flex;
                align-items: center; /*位于垂直方向中心*/
                img
                {
                    width: 30px;
                }

                .goods_info
                {
                    display: flex;
                    flex-direction: column; /*灵活的项目将垂直显示,正如一个列一样*/
                    justify-content: space-between; /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */

                    h1
                    {
                        font-size: 10px;
                    }

                    p .price
                    {
                        color: red;
                        font-weight: bold;
                    }
                }
            }
        }

        .pay
        {
            display: flex; /*启动弹性布局*/
            justify-content: space-between; /*均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点*/
            align-items: center; /*竖直方向居中*/
            .total_price
            {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>