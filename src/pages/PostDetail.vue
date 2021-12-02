<template>
  <div class="row">
                <div class="col-lg-8">
                    <!--section-->
                    <div class="ass1-section__list" v-if="postDetail && postDetail.post">
                        <div class="ass1-section">
                            <post-item :list="postDetail.post"/>
                            <!-- <post-feeling/> -->
                            <ul v-for="item in postDetail.categories" :key="item.TAG_ID">
                                <router-link
                                    tag="li"
                                    :to="{
                                    name: 'home-page',
                                    query: { text: format_url(item.tag_value), tagIndex: item.tag_index },
                                    }"
                                >
                                    <a>{{ item.tag_value }}</a>
                                </router-link>
                            </ul>
                        </div>
                        <post-comment-add/>
                        <post-comments v-bind:comments="postDetail.comments"/>
                    </div>
                </div>
                <div class="col-lg-4">
                    <side-bar/>
                </div>

            </div>
            
</template>

<script>
import SideBar from '../components/SideBar.vue'
import PostFeeling from '../components/PostFeeling.vue'
import PostItem from '../components/PostItem.vue'
import PostCommentAdd from '../components/PostCommentAdd.vue'
import PostComments from '../components/PostComments.vue'
import {mapActions, mapGetters} from 'vuex'
import {removeVietnameseFromString} from '../helpers/index'
export default {
    components: { SideBar, PostItem , PostFeeling, PostCommentAdd,PostComments,},
    name: 'post-detail',
    data(){
        return{
            postId : this.$route.params.id,
        }
    },
    computed:{
        ...mapGetters({'postDetail': 'getPostDetails'}),
        categories() {
            return this.$store.state.modulePost.categories;
        },
        // getpost(){
        //     if(this.postDetail){
        //         return this.postDetail.post;
        //     }
        //     else{
        //         return {};
        //     }
        // }
    },
    watch: {
        $route(to, from) {
            this.postId = to.params.id
            this.getPostDetailById(this.postId)
            .then(res=>{
                if(!res.ok){this.$router.push('/')}
                // console.log(res)
            });
        }
    },
    methods:{   
        ...mapActions(['getPostDetailById']),
        
        format_url(data){
        return removeVietnameseFromString(data)
    }

    },
    created(){
        // load lai trang
        
        this.getPostDetailById(this.postId).then(res=>{
                if(!res.ok){this.$router.push('/')}
                // console.log(res)
            });
    }
}
</script>

<style>

</style>