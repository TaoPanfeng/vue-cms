<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(news,index) in news_list" :key="index">
                <router-link :to="'/home/newsinfo/'+news.id">
                    <img class="mui-media-object mui-pull-left"
                         :src="news.img_url">
                    <div class="mui-media-body">
                        <h1>{{news.title}}</h1>
                        <p class='mui-ellipsis'>
                            <!--如果只想显示年月日 {{news.add_time|dateFormat('YYYY-MM-DD')}}-->
                            <span>发表时间:{{news.add_time | dateFormat}}</span>
                            <span>点击:{{news.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                news_list: []
            }
        },
        created()
        {
            this.get_news_list();
        },
        methods: {
            get_news_list()
            {
                this.$http.get("/api/getnewslist").then(result =>
                {
                    this.news_list = result.data.message;
                }).catch(() =>
                {
                    Toast("获取数据失败...");
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-media-body
    {
        h1
        {
            font-size: 14px;
        }

        .mui-ellipsis
        {
            font-size: 12px;
            color: blue;
            display: flex; /*启动弹性布局*/
            justify-content: space-between; /* 均匀排列每个元素,首个元素放置于起点，末尾元素放置于终点 */
        }
    }
</style>