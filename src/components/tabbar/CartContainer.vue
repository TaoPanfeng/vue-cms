<template>
    <div class="cart_container">
        <!--购物车列表-->
        <div class="cart_list">
            <div class="mui-card" v-for="(goods,index) in goods_list" :key="index">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <input type="checkbox" v-model="select_list" :value="goods"/>
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

        <h3>CartContainer</h3>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import CartNumber from '../subcomponents/CartNumber.vue'

    export default {
        data()
        {
            return {
                goods_list: [],
                select_list: []
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
                alert("支付宝到账 " + this.total_price + " 元...");
            }
        },
        computed: {
            total_count()
            {
                let count = 0;
                this.select_list.forEach(select_one =>
                {
                    count += parseInt(select_one.count);
                });
                return count;
            },
            total_price()
            {
                let price = 0;
                this.select_list.forEach(select_one =>
                {
                    price += parseInt(select_one.count * select_one.price);
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

                input[type=checkbox]
                {
                    position: relative;
                    width: 15px;
                    height: 13px;
                    margin-right: 5px;
                }

                input[type=checkbox]::before
                {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
                    text-align: center;
                    color: white;
                    font-size: 15px;
                    background-color: #eee;
                    border-radius: 4px;
                }

                input[type=checkbox]:checked::before
                {
                    color: white;
                    background-color: #26D09F;
                    content: '√';
                }

                img
                {
                    width: 60px;
                }

                .goods_info
                {
                    display: flex;
                    flex-direction: column; /*灵活的项目将垂直显示,正如一个列一样*/
                    justify-content: space-between; /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */

                    h1
                    {
                        font-size: 14px;
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