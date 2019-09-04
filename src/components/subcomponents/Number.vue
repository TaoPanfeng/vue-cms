<template>
    <div class="number_container">
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input class="mui-input-numbox" type="number" value="1"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
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
    .number_container
    {
    }
</style>