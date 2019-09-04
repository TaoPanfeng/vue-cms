<template>
    <div>
        <h3>我是商品详情{{$route.params.goods_id}}</h3>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                goods_id: this.$route.params.goods_id,/*接收到url中的值*/
                goods_info: {}/*商品对象*/
            }
        },
        created()
        {
            this.get_goods_info();
        },
        methods: {
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
        }
    }
</script>

<style lang="scss" scoped>

</style>