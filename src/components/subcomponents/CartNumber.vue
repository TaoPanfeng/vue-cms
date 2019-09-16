<template>
    <!--外面不能再加 div ,再加的话就不会拼接在,否则换行 -->
    <!--这里可以绑定最大值 是因为它是直接传过来的,不是 .then加载给我的-->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="goods.max_number">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" ref="number"
               :value="goods.count" @change="number_change"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        mounted()
        {
            mui(".mui-numbox").numbox();/*设置刚进入页面就可以点击*/
        },
        methods: {
            number_change()
            {
                /*更新购物车,如果大小超过 max_number 就等于 max_number*/
                let goods_list = this.$store.state.goods_list;
                let index = goods_list.findIndex(g => g.id === this.goods.id);
                let num = this.$refs.number.value;
                let max = this.goods.max_number;
                goods_list[index].count = num > max ? max : num > 0 ? num : 1;
                this.$store.commit('update_store', goods_list);
            }
        },
        props: ["goods"]
    }
</script>

<style lang="scss" scoped>
    .mui-numbox
    {
        height: 25px;
    }
</style>