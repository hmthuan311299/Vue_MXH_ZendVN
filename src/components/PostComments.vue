<template>
    <div class="ass1-comments"  v-if="comments">
        <div class="ass1-comments__head">
            <div class="ass1-comments__title">{{comments.length}} Binh Luan</div>
            <div class="ass1-comments__options">
                <span>Sắp xếp theo:</span>
                <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i></a>
                <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i></a>
                <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"><i class="icon-Expand_all"></i></a>
            </div>
        </div>
        <!-- <PostcmtItem v-for="cmt in comments" :key ="cmt.CID" :cmt="cmt"/> -->
        <template>
        <div class="ass1-comments__section" v-for="cmt in comments" :key ="cmt.CID">
            <a href="#" class="ass1-comments__avatar ass1-avatar"><img src="/dist/images/avatar-02.png" alt=""></a>
            <div class="ass1-comments__content">
                <a href="#" class="ass1-comments__name">{{cmt.fullname}}</a>
                <span class="ass1-comments__passed">{{cmt.time_added}}</span>
                <p>{{cmt.comment}}</p>
                <div class="ass1-comments__info">
                    <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"><i class="icon-Upvote"></i><span>901</span></a>
                    <a href="#" class="ass1-comments__btn-down ass1-btn-icon"><i class="icon-Downvote"></i><span>36</span></a>
                </div>
            </div>
        </div>
        </template>
    </div>
</template>
    
<script>
import PostcmtItem from './PostcmtItem.vue'
import {getTimePost} from '../plugins/moment'
import moment from 'moment'
export default {
    name: 'post-comments',
    components:{
        PostcmtItem
    },
    props:{
        comments:Array
    },
    computed:{
        getTimePost : () => {
            // moment.locale('vi')
            // return moment(cmt.time_added).fromNow();
            this.getTimePost(cmt.time_added)
        }
    }
}
</script>

<style>

</style>