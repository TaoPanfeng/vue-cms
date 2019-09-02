<template>
    <div>
        <!--顶部滑动导航条-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl"
                 class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--<a class="mui-control-item mui-active"-->
                    <a :class="['mui-control-item', index == 0 ? 'mui-active' : '']"
                       v-for="(category,index) in category_list" :key="index"
                       @click="get_picture_list_by_category_id(category.id)">
                        {{category.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图片列表-->
        <ul class="picture-list">
            <li v-for="(picture,index) in picture_list" :key="index">
                <img v-lazy="picture.img_url">
                <div class="info">
                    <h1 class="info_title">{{picture.seo_title}}</h1>
                    <div class="info_content">{{picture.content}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                category_list: [],
                picture_list: []
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
            },
            get_picture_list_by_category_id(category_id)
            {
                this.$http.get("/api/getimages/" + category_id).then(result =>
                {
                    this.picture_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取图片数据失败...");
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

    .picture-list
    {
        list-style: none; /*清除 ul li 前面的点· */
        margin: 0;
        padding: 10px; /*内边距*/
        padding-bottom: 0; /*内边距-下*/
        li
        {
            background-color: #cccccc;
            text-align: center; /*文件对齐:居中*/
            margin-bottom: 10px; /*外边距-下*/
            box-shadow: 0 0 10px #999; /*阴影设置: x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
            position: relative; /*位置:相对*/
            img /*图片设置*/
            {
                width: 100%;
                vertical-align: middle; /*垂直居中对齐*/
            }

            img[lazy=loading] /*懒加载图片*/
            {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info
            {
                color: white;
                text-align: left; /*文本对齐:靠左*/
                position: absolute; /*位置:绝对*/
                bottom: 0; /*底边高0*/
                background-color: rgba(0, 0, 0, 0.4); /*前面三个表示颜色,最后表示透明度*/
                max-height: 85px; /*最大高度*/

                .info_title
                {
                    font-size: 14px;
                }

                .info_content
                {
                    font-size: 10px;
                }
            }
        }
    }


</style>