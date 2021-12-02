<template>
  <div class="search-page">
      <div class="search-info">
          <p>Từ khóa tìm kiếm: <mark>{{query}}</mark></p>
          <p>Số bài viết tìm thấy: {{listPostSearch.length}}</p>
      </div>
       <post-item
				v-for="item in listPostSearch"
				v-bind:key="item.PID"
				v-bind:list="item"
				class="col-lg-12 posts"
	   />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import postItem from '../components/PostItem.vue'
export default {
    name: 'search',
    data(){
        return{
            listPostSearch:[],
            query: this.$route.query.query,
        }
    },

    components:{
        postItem
    },
    watch: {
        '$route'(to, from) {
            this.query = to.query.query;
            this.checkQuery();
            this.fetchDataSearch()
            
        }
    },
    created(){
        this.query= this.$route.query.query
        this.checkQuery();
        this.fetchDataSearch()
    },
    methods:{
        ...mapActions(['getListPostSearch']),
        checkQuery(){
            if(!this.query){
                this.$router.push("/");
            }
        },
        fetchDataSearch(){
            if(this.query){
                this.getListPostSearch(this.query).then(res=>{
                if(res.ok){
                    this.listPostSearch = res.listPost;
                }
            })
            }
        }
    },
    
}
</script>

<style scoped>

    .search-page{
        margin-top: 25px ;
        
    }
    .posts{
        margin-top: 20px;
    }
    mark{
        background: rgb(248, 248, 174);
    }
</style>