<template>
    <div class="ass1-section__list"> 
        <post-item v-for="list in getListPost" :key="list.PID" :list="list" />
        <button v-if="getListPost && getListPost.length" class="load-more ass1-btn" @click="loadMore()"><span>Xem thêm</span></button>
        <h1 v-else>Không tìm thấy bài viết nào</h1>
    </div>
</template>

<script>
import {PAGE_SIZE,CURRENT_PAGE} from '../contanst/index'
import PostItem from './PostItem';
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'post-list',
    data(){
        return {
                pagesize:PAGE_SIZE,
                currPage: CURRENT_PAGE,
                tagIndex: parseInt(this.$route.query.tagIndex)
        }
    },
    components:{
        PostItem
    },
    computed:{
        ...mapGetters(['getListPost'])
    },
    created(){
        var tagIndex = this.$route.query.tagIndex;
        var result = this.getListPostHasPaging({tagIndex});
        console.log(result)
    },
    watch: {
        $route(to, from) {
            console.log(to);
            this.tagIndex = to.query.tagIndex;
            this.currPage = 1;
            
        }
    },
    methods:{
        ...mapActions(['getListPostHasPaging']),
        loadMore(){
            // this.pagesize = this.pagesize;
            this.currPage = this.currPage + 1;
            let obj={
                pagesize: this.pagesize,
                currPage: this.currPage,
                tagIndex : this.tagIndex
            }
            // 
            console.log("load more", obj)
            this.getListPostHasPaging(obj)


        }
    },
    
};
</script>

<style>
</style>,