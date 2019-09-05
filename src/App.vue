<template>
    <div class="app_container">
        <!--顶部-->
        <mt-header fixed title="固定在顶部"></mt-header>
        <!--中间 路由 router-view-->
        <transition>
            <router-view></router-view>
        </transition>

        <!--底部-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home-filled"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/cart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="end_position">0</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script></script>

<!--lang表示设置样式为 scss ,scoped表示此样式只能当前模版使用-->
<style lang="scss" scoped>
    .app_container
    {
        padding-top: 40px; /*让固定在顶部与<h1>标签内容不重合*/
        padding-bottom: 50px;/*底部栏50px*/
        overflow-x: hidden;
        .mint-header{
            z-index: 99;/*z-index较大的会覆盖较小的*/
        }
    }

    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;/*0.5秒*/
    }
</style>