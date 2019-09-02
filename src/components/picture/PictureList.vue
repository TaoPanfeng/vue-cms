<template>
    <div>
        <!--顶部滑动条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--<a class="mui-control-item mui-active"-->
                    <a :class="['mui-control-item', index == 0 ? 'mui-active' : '']"
                       v-for="(category,index) in category_list" :key="index">
                        {{category.title}}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                category_list: []
            }
        },
        created()
        {
            this.get_all_category();
        },
        methods: {
            get_all_category()
            {
                this.$http.get("/api/getimgcategory").then(result =>
                {
                    result.data.message.unshift({title: "全部", id: 0});
                    this.category_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取所有分类数据失败...");
                });
            }
        },
        mounted()//组件中内容被渲染好之后
        {
            /*需要在.babelrc 中配置"transform-remove-strict-mode"*/
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style lang="scss" scoped>
    /*解决滑动报错: [HMR] Update failed: Error: Manifest request to*/
    *
    {
        touch-action: pan-y;
    }
</style>