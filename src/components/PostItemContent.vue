<template>
    <div class="ass1-section__content">
        <p class='formatText' v-html="formatPostContent"></p>
        <div class="ass1-section__image">
            <router-link :to="{name: 'post-detail', params:{id:post.PID}}">
                <img :src="`https://img2.thuthuatphanmem.vn/uploads/2018/12/05/hinh-anh-nhung-chau-cay-canh-dep_121227955.jpg`" :alt="post.post_content">
            </router-link>
        </div>
    </div>
</template>

<script>
import {replaceAll} from '../helpers/index'
export default {
    name: 'post-item-content',
    data(){
        return{
            query: this.$route.query.query
        }
    },
    props:{
        post: Object
    },
    watch: {
        '$route'(to, from) {
            this.query = to.query.query;          
        }
    },
    created(){
        this.query= this.$route.query.query
    },
    computed:{
       formatPostContent(){
            if(this.query){
                return replaceAll(this.post.post_content, this.query, `<mark>${this.query}</mark>`);
            }
            return this.post.post_content
    }
    }
}
</script>

<style>
    .formatText{
        text-transform: capitalize;
    }
    mark{
        background: tomato;
        padding: 0;
    }
</style>