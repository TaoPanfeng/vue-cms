<template>
    <div>
        <mt-swipe :auto="1000">
            <!--谁使用这个组件就传 lunbotu_list-->
            <!--也就是其他要使用轮播图的组件 到 此组件 传递的值-->
            <mt-swipe-item v-for="(lunbotu,index) in lunbotu_list" :key="index">
                <img :src="lunbotu.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["lunbotu_list"]
    }
</script>

<style lang="scss" scoped>
    .mint-swipe /*设置轮播图*/
    {
        height: 200px; /*高度:200,不然不显示,默认为0了*/
        .mint-swipe-item
        {
            img
            {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>