<template>
    <div class="goods_info_container">

        <!--小球动画-->
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
            <div class="ball" v-show="show_ball" ref="start_position"></div>
        </transition>

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
                        <number_component @send_number="receive_number"
                                          :max_number="goods_info.stock_quantity"></number_component>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="add_cart">加入购物车</mt-button>
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
                <mt-button type="primary" size="large" plain @click="go_goods_description(goods_id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="go_goods_comment(goods_id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import Swipe from '../subcomponents/Swipe.vue'
    import Number from '../subcomponents/Number.vue'

    export default {
        data()
        {
            return {
                goods_id: this.$route.params.goods_id,/*接收到url中的值*/
                lunbotu_list: [],/*轮播图集合*/
                goods_info: {},/*商品对象*/
                show_ball: false,/*是否显示小球*/
                select_count: 1/*选择的数量,默认为1*/
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
            },
            go_goods_description(goods_id)
            {
                /*编程式导航 跳转到 商品介绍*/
                this.$router.push({name: "goodsdescription", params: {goods_id}});
            },
            go_goods_comment(goods_id)
            {
                this.$router.push({name: "goodscomment", params: {goods_id}});
            },
            add_cart()
            {
                this.show_ball = !this.show_ball;/*取非*/

                // 1,查询本地购物车,有数据则返回,没有返回空数组[]
                let goods_list = JSON.parse(localStorage.getItem("VUE_CMS_CART")) || [];

                // 2,判断 localStorage 中是否存在当前商品的 goods_no,如果存在 goods 就为那个对象,不存在就为undefined
                let goods = goods_list.find(g => g.id === this.goods_info.id);

                // 3,判断对象是否存在,存在就在 localStorage 中修改数量,不存在就新增
                if (goods)
                {
                    /*查找到这个 goods 在 goods_list 中的下标*/
                    let index = goods_list.findIndex(g => g.id === this.goods_info.id);
                    goods_list[index].count += parseInt(this.select_count);
                } else
                {
                    goods_list.push({
                        id: this.goods_info.id,/*编号*/
                        title: this.goods_info.title,/*标题*/
                        img: this.lunbotu_list[0].src,/*图片*/
                        price: parseInt(this.goods_info.sell_price),/*单价*/
                        count: parseInt(this.select_count),/*数量*/
                        max_number: parseInt(this.goods_info.stock_quantity)/*库存*/
                    });
                }
                // 4,更新 localStorage 中的数据,如果 当前商品的数量不能超过库存数量
                let goods_index = goods_list.findIndex(g => g.id === this.goods_info.id);
                if (goods_list[goods_index].count > this.goods_info.stock_quantity)
                {
                    goods_list[goods_index].count = this.goods_info.stock_quantity;
                }

                localStorage.setItem("VUE_CMS_CART", JSON.stringify(goods_list));
            },
            beforeEnter(el)
            {
                el.style.transform = "translate(0, 0)";/*(0,0)就是我们样式中定义的位置*/
            },
            enter(el, done)
            {
                el.offsetWidth;

                /*在动画中 小球 div 属性定义 ref="start_position"*/
                const start_position = this.$refs.start_position.getBoundingClientRect();
                /*在购物车数量小红点定义 id="end_position"*/
                const end_position = document.getElementById("end_position").getBoundingClientRect();

                const x_offset = end_position.x - start_position.x;/*x偏移量*/
                const y_offset = end_position.y - start_position.y;/*y偏移量*/

                el.style.transform = "translate(" + x_offset + "px," + y_offset + "px)";

                // 动画效果: 把 ease 替换成 cubic-bezier(.4,-0.3,1,.68)
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

                done();
            },
            afterEnter(el)
            {
                this.show_ball = !this.show_ball;/*取非*/
            },
            receive_number(data)
            {
                this.select_count = data;
            }
        },
        components: {
            "swipe_component": Swipe,
            "number_component": Number
        }
    }
</script>

<style lang="scss" scoped>
    .goods_info_container
    {
        background-color: #eee;
        overflow: hidden; /*移除此div的内容隐藏*/
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

        .ball
        {
            width: 15px;
            height: 15px;
            border-radius: 50%; /*半径*/
            background-color: red;
            position: absolute; /*绝对路径*/
            z-index: 99; /*靠前显示*/
            top: 411px;
            left: 146px;
        }
    }
</style>