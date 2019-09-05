<template>
    <!--外面不能再加 div ,再加的话就不会拼接在,否则换行 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" value="1"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        mounted()
        {
            mui(".mui-numbox").numbox();/*设置刚进入页面就可以点击*/
        }
    }
</script>

<style lang="scss" scoped>

</style>