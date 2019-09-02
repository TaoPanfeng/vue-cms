<template>
    <div class="picture_info_container">
        <!--主标题-->
        <h3 class="title">{{picture_info.title}}</h3>
        <!--副标题-->
        <p class="subtitle">
            <span>发布时间:{{picture_info.add_time | dateFormat}}</span>
            <span>点击:{{picture_info.click}}次</span>
        </p>

        <hr/>

        <!--缩略图-->
        <div class="thumbnail">
            <viewer :images="thumbnail_list">
                <img v-for="(thumbnail,index) in thumbnail_list" :key="index"
                     :src="thumbnail.src" width="100">
            </viewer>
        </div>

        <!--图片内容-->
        <div class="content" v-html="picture_info.content"></div>

        <!--评论子组件-->
        <comment_component :id="picture_id" class="preview"></comment_component>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    import comment from '../subcomponents/Comment.vue'

    export default {
        data()
        {
            return {
                picture_id: this.$route.params.picture_id,//接收到url中的id值
                picture_info: {},
                thumbnail_list: []
            }
        },
        created()
        {
            this.get_picture_info();
            this.get_thumbnail_list();
        },
        methods: {
            get_picture_info()
            {
                this.$http.get("/api/getimageInfo/" + this.picture_id).then(result =>
                {
                    this.picture_info = result.data.message[0];
                }).catch(() =>
                {
                    Toast("获取图片详情数据失败...");
                });
            },
            get_thumbnail_list()
            {
                this.$http.get("/api/getthumimages/" + this.picture_id).then(result =>
                {
                    this.thumbnail_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取缩略图数据失败...");
                });
            }
        },
        components: {
            "comment_component": comment
        }
    }
</script>

<style lang="scss" scoped>
    .picture_info_container
    {
        padding: 3px; /*内边距*/
        .title
        {
            color: blue;
            font-size: 16px;
            text-align: center; /*文本对齐:居中*/
            margin: 10px 0; /*外边距:上下10px 左右0*/
        }

        .subtitle
        {
            display: flex; /*启动弹性布局*/
            justify-content: space-between; /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
            font-size: 12px;
        }

        .thumbnail img
        {
                margin: 10px;
                box-shadow: 0 0 8px #999999; /*阴影设置: x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
        }

        .content
        {
            font-size: 12px;
            line-height: 20px; /*行高:20px*/
        }
    }
</style>