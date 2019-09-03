<template>
    <div class="goods_list_container">
        <div class="goods">
            <img src="data:image/jpeg;base64,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"
                 alt="">
            <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now_price">￥899</span>
                    <span class="old_price">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods">
            <img src="data:image/jpeg;base64,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"
                 alt="">
            <h1 class="title">小米（Mi）小米Note 16G双网通版</h1>
            <div class="info">
                <p class="price">
                    <span class="now_price">￥899</span>
                    <span class="old_price">￥999</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
    .goods_list_container
    {
        display: flex; /*设置flex布局,两个商品时会左右排列*/
        flex-wrap: wrap; /*让弹性盒元素在必要的时候拆行*/
        padding: 8px;
        justify-content: space-between;

        .goods
        {
            width: 49%; /*设置宽度之后,.goods_list_container的flex-wrap会一行加载两个*/
            border: 1px solid #ccc; /*给边缘加 1px 实线 颜色*/
            box-shadow: 0 0 8px #ccc; /*阴影设置: x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
            margin: 4px 0;
            padding: 2px;
            display: flex;
            flex-direction: column; /*灵活的项目将垂直显示,正如一个列一样(竖着对齐)*/
            justify-content: space-between; /*项目位于各行之间留有空白的容器内*/
            min-height: 293px; /*设置段落的最低高度*/

            img
            {
                width: 100%;
            }

            .title
            {
                font-size: 14px;
            }

            .info
            {
                background-color: #eee;

                p
                {
                    margin: 0;
                    padding: 5px;
                }

                .price
                {
                    .now_price
                    {
                        color: red;
                        font-weight: bold; /*字体加粗*/
                        font-size: 16px;
                    }

                    .old_price
                    {
                        text-decoration: line-through; /*定义穿过文本下的一条线。*/
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell
                {
                    /*display: flex;*/
                    /*justify-content: space-between;*/
                    /*font-size: 13px;*/
                }
            }
        }
    }
</style>