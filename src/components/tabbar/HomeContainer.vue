<template>
    <div>
        <!--轮播图-->
        <mt-swipe id="aaa" :auto="1000">
            <mt-swipe-item v-for="(lunbotu,index) in lunbotu_list" :key="index">
                <img :src="lunbotu.img">
            </mt-swipe-item>
        </mt-swipe>

        <h3>HomeContainer</h3>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        data()
        {
            return {
                lunbotu_list: []// 保存轮播图的数组
            }
        },
        created()
        {
            this.get_lunbotu_data();
        },
        methods: {
            get_lunbotu_data()// 获取轮播图数据的方法
            {
                this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(result =>
                {
                    // console.log(result);//打印请求结果
                    if (result.data.status === 0)// 成功了
                    {
                        this.lunbotu_list = result.data.message;
                    } else// 失败了
                    {
                        Toast("加载轮播图失败...");
                    }
                });
            }
        }
    }
</script>

<!--scoped设置自己组件可用-->
<style scoped>
    .mint-swipe /*设置轮播图*/
    {
        height: 200px; /*高度:200,不然不显示,默认为0了*/
    }

    .mint-swipe-item:nth-child(1) /*第一个轮播图*/
    {
        background-color: red;
    }

    .mint-swipe-item:nth-child(2) /*第二个轮播图*/
    {
        background-color: yellow;
    }

    .mint-swipe-item:nth-child(3) /*第三个轮播图*/
    {
        background-color: blue;
    }

    .mint-swipe-item img
    {
        width: 100%;
        height: 100%;
    }

</style>