<template>
    <div class="app_container">
        <!--顶部-->
        <mt-header fixed title="固定在顶部"></mt-header>
        <!--中间 路由 router-view-->

        <!--底部-->
        <h1 id="aaa">我是主文件_App.vue</h1>
    </div>
</template>

<script></script>

<!--lang表示设置样式为 scss ,scoped表示此样式只能当前模版使用-->
<style lang="scss" scoped>
    .app_container
    {
        padding-top: 40px; //让固定在顶部与<h1>标签内容不重合
    }
</style>