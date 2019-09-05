<template>
    <!--外面不能再加 div ,再加的话就不会拼接在,否则换行 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" value="1" @change="number_change"/>
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
                // 获取当前的值
                // 1,给要获取的标签(也就是input)加 ref="number"  this.$refs.number.value
                // 2,mui(".mui-numbox").numbox().getValue() 获取
                this.$emit("send_number", mui(".mui-numbox").numbox().getValue())
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>