<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入要评论的内容,最多120字..." maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="comment-list">
            <div class="comment" v-for="(comment,index) in comment_list" :key="index">
                <div class="comment-title">
                    {{index+1}}楼&emsp;用户:{{comment.user_name}}&emsp;发表时间:{{comment.add_time | dateFormat}}
                </div>
                <div class="comment-body">
                    {{comment.content === 'undefined'|| comment.content === '' ?  '此内容什么都无' : comment.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="get_more_comment">加载更多</mt-button>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                comment_list: [],
                page_number: 555,/*默认 第一页*/
            }
        },
        created()
        {
            this.get_comment_list();
        },
        methods: {
            get_comment_list()
            {
                // console.log(this.id);//打印接收到父组件的值
                this.$http.get("/api/getcomments/" + this.id + "?pageindex=" + this.page_number).then(result =>
                {
                    /* concat , 合并数组 */
                    this.comment_list = this.comment_list.concat(result.data.message);
                }).catch(() =>
                {
                    Toast("获取评论数据失败...");
                });
            },
            get_more_comment()
            {
                this.page_number++;
                this.get_comment_list();
            }
        },
        props: ["id"]
    }
</script>

<style lang="scss" scoped>
    .comment-container
    {
        h3
        {
            font-size: 18px;
        }

        textarea
        {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .comment-list
        {
            margin: 5px 0; /*外边距 上下5px 左右0px*/
            .comment
            {
                font-size: 12px;

                .comment-title
                {
                    line-height: 30px; /*行高:30px*/
                    background-color: #cccccc;
                }

                .comment-body
                {
                    line-height: 35px;
                    text-indent: 2em; /*文本缩进 2em*/
                }
            }
        }
    }
</style>