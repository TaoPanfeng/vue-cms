<template>
    <div>
        <mt-swipe :auto="1000">
            <!--谁使用这个组件就传 lunbotu_list-->
            <!--也就是其他要使用轮播图的组件 到 此组件 传递的值-->
            <mt-swipe-item v-for="(lunbotu,index) in lunbotu_list" :key="index">
                <!--如果 is_full 的值为 true 就启用 .full_or_adaptive 样式-->
                <img :src="lunbotu.img" :class="{full_or_adaptive:is_full}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["lunbotu_list", "is_full"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe /*设置轮播图*/
    {
        height: 200px; /*高度:200,不然不显示,默认为0了*/
        .mint-swipe-item
        {
            text-align: center; /*轮播图居中*/
            img
            {
                height: 100%;
            }

            .full_or_adaptive
            {
                width: 100%;
            }
        }
    }
</style>