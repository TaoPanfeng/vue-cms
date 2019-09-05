<template>
    <div class="news_info_container">
        <!--主标题-->
        <h3 class="title">{{news_info.title}}</h3>
        <!--副标题-->
        <p class="subtitle">
            <span>发表时间:{{news_info.add_time|dateFormat}}</span>
            <span>点击:{{news_info.click}}次</span>
        </p>

        <hr/>

        <!--内容-->
        <div class="content" v-html="news_info.content"></div>
        <!--评论子组件-->
        <comment_component :id="news_id"></comment_component>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    /*导入评论子组件*/
    import Comment from '../subcomponents/Comment.vue'

    export default {
        data()
        {
            return {
                news_id: this.$route.params.news_id,/*接收到url中的id值*/
                news_info: {}/*新闻对象*/
            }
        },
        created()
        {
            this.get_news_info();
        },
        methods: {
            get_news_info()// 获取新闻消息
            {
                this.$http.get("/api/getnew/" + this.news_id).then(result =>
                {
                    this.news_info = result.data.message[0];
                }).catch(() =>
                {
                    Toast("获取新闻详情数据失败...");
                });
            }
        },
        components: {/*用来注册子组件*/
            "comment_component": Comment
        }
    }
</script>

<style lang="scss" scoped>
    .news_info_container
    {
        padding: 0 4px;

        .title
        {
            font-size: 16px;
            text-align: center; /*居中对齐*/
            color: red;
        }

        .subtitle
        {
            font-size: 12px;
            color: blue;
            display: flex; /*启动弹性布局*/
            justify-content: space-between; /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
        }

        .content img
        {
            width: 100%; /*设置图片宽度100%,如果不生效,去除 style 的 scoped 属性*/
        }
    }
</style>