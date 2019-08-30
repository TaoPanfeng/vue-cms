<template>
    <div>
        <!--轮播图-->
        <mt-swipe id="aaa" :auto="1000">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
        </mt-swipe>

        <h3>HomeContainer</h3>
    </div>
</template>

<script></script>

<!--scoped设置自己组件可用-->
<style scoped>
    .mint-swipe /*设置轮播图*/
    {
        height: 200px; /*高度:200,不然不显示,默认为0了*/
    }

    .mint-swipe-item:nth-child(1)/*第一个轮播图*/
    {
        background-color: red;
    }

    .mint-swipe-item:nth-child(2)/*第二个轮播图*/
    {
        background-color: yellow;
    }

    .mint-swipe-item:nth-child(3)/*第三个轮播图*/
    {
        background-color: blue;
    }

</style>