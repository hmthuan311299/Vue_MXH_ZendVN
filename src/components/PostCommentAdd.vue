<template>
    <div class="ass1-add-comment">
        <form action="#" @submit.prevent="handleAddComment">
            <input v-model='comment' type="text" class="form-control ttg-border-none" placeholder="Thêm một bình luận">
        </form>
        <div class="ass1-add-comment__content">
            <a href="#" class="ass1-add-comment__btn-save ass1-btn-icon"><span>{{maxlength - comment.length }}</span><i class="icon-Submit_Tick"></i></a>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'post-comment-add',
    data(){
        return{
            maxlength: 300,
            comment:'',
            postid:this.$route.params.id,
        }
    },
    watch:{
        '$route'(to, from){
            this.postid= to.params.id;
        }
    },
    created(){

    },
    methods:{
        ...mapActions(['addNewComment']),
        handleAddComment(){
            console.log(this.comment)
            if(this.comment && this.comment.length<=this.maxlength){
                let data ={comment: this.comment, pid : this.postid}

                this.addNewComment(data).then(res=>{
                    if(res.ok){
                        alert("them thanh cong");
                    }
                })
            }
            else{
                alert("vui long nhap lai");
            }
        }
    },

}
</script>

<style>

</style>