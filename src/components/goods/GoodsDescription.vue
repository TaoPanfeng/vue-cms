<template>
    <div class="goods_description_container">
        <h3 class="title">{{goods_info.title}}</h3>

        <hr/>

        <div class="content" v-html="goods_info.content"></div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                goods_info: {}/*商品信息*/
            }
        },
        created()
        {
            this.get_goods_info();
        },
        methods: {
            get_goods_info()
            {
                this.$http.get("/api/goods/getdesc/" + this.$route.params.goods_id).then(result =>
                {
                    this.goods_info = result.data.message[0];
                }).catch(() =>
                {
                    Toast("获取商品信息数据失败...");
                });
            }
        }
    }
</script>

<style lang="scss">
    .goods_description_container
    {
        padding: 4px;

        .title
        {
            font-size: 14px;
            color: blue;
            text-align: center;
            margin: 15px 0; /*外边距 上下15px 左右0*/
        }

        .content
        {
                img
                {
                    margin: 0;
                    width: 100%; /*v-html生成的页面需要去除scoped*/
                }
        }
    }
</style>