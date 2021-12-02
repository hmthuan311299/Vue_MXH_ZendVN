<template>
    <!-- list!=null -->
    <div v-if="list">
        <post-item-header :post="list"/>
        <post-item-content :post="list"/>
        <post-item-footer :post="list"/>
    </div>
</template>

<script>
import PostItemHeader from './PostItemHeader.vue'
import PostItemContent from './PostItemContent.vue'
import PostItemFooter from './PostItemFooter.vue'
export default {
    name:'post-item',
    components:{
        PostItemHeader,
        PostItemContent,
        PostItemFooter
    },
    props:{
        list: Object
    }
}
</script>

<style>

</style>