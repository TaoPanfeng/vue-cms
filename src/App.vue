<template>
    <div class="app_container">
        <!--顶部-->
        <mt-header fixed title="固定在顶部"></mt-header>
        <!--中间 路由 router-view-->

        <!--底部-->
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" href="#tabbar">
                <span class="mui-icon mui-icon-home-filled"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </a>
        </nav>

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