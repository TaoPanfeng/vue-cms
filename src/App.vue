<template>
    <div class="app_container">
        <!--顶部-->
        <mt-header fixed title="固定在顶部">
            <router-link to="/" slot="left" v-show="show_go_back">
                <mt-button icon="back" @click="go_back">返回</mt-button>
            </router-link>
        </mt-header>

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
                    <span class="mui-badge" id="end_position">{{$store.getters.get_cart_all_count}}</span>
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

<script>
    export default {
        data()
        {
            return {
                show_go_back: false/*是否要显示返回按钮*/
            }
        },
        created()
        {
            this.show_go_back = this.$route.path === "/home" ? false : true;
        },
        watch: {
            "$route.path"(new_path)/*获取 url 中 # 后面的字符串*/
            {
                this.show_go_back = new_path === "/home" ? false : true;
            }
        },
        methods: {
            go_back()
            {
                this.$router.go(-1);/*路由后退一步*/
            }
        }
    }
</script>

<!--lang表示设置样式为 scss ,scoped表示此样式只能当前模版使用-->
<style lang="scss" scoped>
    .app_container
    {
        padding-top: 40px; /*让固定在顶部与<h1>标签内容不重合*/
        padding-bottom: 50px; /*底部栏50px*/
        overflow-x: hidden;

        .mint-header
        {
            z-index: 99; /*z-index较大的会覆盖较小的*/
        }
    }

    .v-enter
    {
        opacity: 0;
        transform: translateX(100%);
    }

    .v-leave-to
    {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active
    {
        transition: all 0.5s ease; /*0.5秒*/
    }
</style>