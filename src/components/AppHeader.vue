<template>
  <header>
        <div class="ass1-header">
            <div class="container">
                <router-link to="/" class="ass1-logo">
					ZendVn Meme
				</router-link>
                <app-navigation/>
                <app-header-search/>
                <router-link :to="{name:'upload'}" class="ass1-header__btn-upload ass1-btn">
                    <i class="icon-Upvote"></i> Upload
                </router-link >
                <router-link to="/login" class="ass1-header__btn-upload ass1-btn" v-if='!isLogin'>
					Login
				</router-link>
                <div class="wrapper-user">
					<router-link :to='setRouterLink'
						class="user-header">
						<span class="avatar">
							<img v-bind:src="`https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png`" alt="avatar">
						</span>
						<span class="email">{{setfullname}}</span>
					</router-link>
					<!-- <div v-on:click="handleLogout" class="logout ass1-header__btn-upload ass1-btn">Logout</div> -->
				</div>
                 <button class="ass1-header__btn-upload ass1-btn" v-if='isLogin' @click='handleLogout()'>
					Đăng xuất
				</button>
            </div>
        </div>

    </header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import AppNavigation from './AppNavigation.vue'
import AppHeaderSearch from './AppHeaderSearch.vue'
import $ from 'jquery'
export default {
    name: 'app-header',
    components:{
        AppNavigation,
        AppHeaderSearch
    },
    mounted(){
         $(".ass1-header__menu li > a").click(function(e) {
            // $(".ass1-header__nav").hide();
            $('.ass1-header__nav').slideToggle(300, 'swing');
        });

        $(".ass1-header__menu ul li > a").click(function(e) {
             // $(this).parents(".ass1-header__nav").slideUp(300, 'swing');
             $(".ass1-header__nav").slideUp();
        })
    },
    computed:{
        ...mapGetters(['isLogin', 'currUser']),
        setfullname(){
            if(this.currUser&&this.currUser.fullname)
            return this.currUser.fullname
            return null
        },
        setRouterLink(){
            if(this.currUser&&this.currUser.USERID){
                return {name:'user-page', params:{id: this.currUser.USERID}}
                
            }
            return '/login'
        }
        
    },
    methods:{
        ...mapActions(['getLogout']),
        handleLogout(){
            this.getLogout().then(res=> {
                if(res.ok){
                    this.$router.push('/login')
                }
            });
        }
    }
}
</script>

<style scoped>

.user-header{
    position: relative;
    display: inline-block;
    margin-left: 4px ;
}
.user-header > span{
    display: inline-block;
    vertical-align: middle;
}
.user-header .avatar{
    width: 35px;
    height: 35px;
    overflow: hidden;
    margin-right: 4px ;
}
.user-header .avatar:hover{
   cursor: pointer;
}
.user-header .avatar img{
    width: 100%;
    height: 100%;
    border-radius: 50% ;
}
</style>