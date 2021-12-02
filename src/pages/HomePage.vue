<template>
    <div class="row">
        <div class="col-lg-8">
            <PostList/>
        </div>
        <div class="col-lg-4">
            <side-bar/>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import SideBar from '../components/SideBar.vue'
import PostList from '../components/PostList.vue'
export default {
    name: 'home-page',
    components:{
        SideBar,
        PostList
    },
    methods:{
        ...mapActions(['getListPostHasPaging'])
    },
    watch: {
        $route(to, from) {
            console.log(to);
            var tagIndex = to.query.tagIndex;
            if(tagIndex){
                //goi api categories
                console.log('goi api categories')
                this.getListPostHasPaging({tagIndex:tagIndex})
                
            }
            else{
                //goi api has page
                this.getListPostHasPaging({})
            }
        }
    }
    
}
</script>

<style>

</style>