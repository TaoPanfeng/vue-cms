<template>
    <div>
        <comment_component :id="$route.params.goods_id"></comment_component>
    </div>
</template>

<script>
    import Comment from '../subcomponents/Comment.vue'

    export default {
        components: {
            "comment_component": Comment
        }
    }
</script>

<style lang="scss" scoped>

</style>