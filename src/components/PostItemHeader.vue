<template>
    <div class="ass1-section__head">
        <router-link :to="getLinkUser" class="ass1-section__avatar ass1-avatar"><img :src="getAvatar" alt=""></router-link>
        <div>
            <router-link :to="getLinkUser" href="#" class="ass1-section__name formatText" v-html='formatFullName'></router-link>
            <span class="ass1-section__passed">{{bgetTimePost}}</span>
        </div>
        <router-link :to="getLinkUser" href="#" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></router-link>
    </div>
</template>

<script>
import {replaceAll} from '../helpers/index'
import {getTimePost} from '../plugins/moment'
export default {
 name: 'post-item-header',
 data(){
     return {
         query: this.$route.query.query
     }
 },
 props:{
     post: Object
 },
 computed:{
     getAvatar(){
            // if(this.post.profilepicture = "")
            return this.post.profilepicture ? this.post.profilepicture : '/dist/images/avatar-01.png'
    },
    getLinkUser(){
        if(this.post.USERID){
            return {name:'user-page', params:{id: this.post.USERID}}
        }
        return {path:"/"}
    },
    bgetTimePost(){
        // moment.locale('vi')
        // return moment(this.post.time_added).fromNow(); 
        return getTimePost(this.post.time_added)
    },
    formatFullName(){
            if(this.query){
                return replaceAll(this.post.fullname, this.query, `<mark>${this.query}</mark>`);
            }
            return this.post.fullname
    }
 },
    watch: {
        '$route'(to, from) {
            this.query = to.query.query;          
        }
    },
    created(){
        this.query= this.$route.query.query
    },
    methods:{
        
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