<template>
    <div class="comment_container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入要评论的内容,最多120字..." maxlength="120" v-model="comment_info"></textarea>

        <mt-button type="primary" size="large" @click="send_comment">发表评论</mt-button>

        <div class="comment_list">
            <div class="comment" v-for="(comment,index) in comment_list" :key="index">
                <div class="comment_title">
                    {{index+1}}楼&emsp;用户:{{comment.user_name}}&emsp;发表时间:{{comment.add_time | dateFormat}}
                </div>
                <div class="comment_body">
                    {{comment.content === 'undefined'|| comment.content === '' ? '此内容什么都无' : comment.content}}
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
                page_number: 1,/*默认 第一页*/
                comment_info: ""
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
            },
            send_comment()
            {
                if (this.comment_info.trim().length === 0)
                {
                    return Toast("评论内容不能为空...");
                }

                this.$http.post("/api/postcomment/" + this.id, {content: this.comment_info}).then(result =>
                {
                    this.comment_list.unshift({
                       user_name:"匿名用户",
                       add_time:Date.now(),
                       content:this.comment_info.trim()
                    });
                    this.comment_info="";
                }).catch(() =>
                {
                    Toast("发表评论失败...");
                });
            }
        },
        props: ["id"]
    }
</script>

<style lang="scss" scoped>
    .comment_container
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

        .comment_list
        {
            margin: 5px 0; /*外边距 上下5px 左右0px*/
            .comment
            {
                font-size: 12px;

                .comment_title
                {
                    line-height: 30px; /*行高:30px*/
                    background-color: #cccccc;
                }

                .comment_body
                {
                    line-height: 35px;
                    text-indent: 2em; /*文本缩进 2em*/
                }
            }
        }
    }
</style>