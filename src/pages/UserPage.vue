<template>
	<div>
		<div class="ass1-head-user" v-if="userInfo">
			<div class="ass1-head-user__content">
				<div class="ass1-head-user__image">
					<a href="#"><img :src="userInfo.profilepicture || `/dist/images/cat-1634369_1920.jpg`" alt="" /></a>
				</div>
				<div class="ass1-head-user__info">
					<div class="ass1-head-user__info-head">
						<div class="ass1-head-user__name">
							<span>{{userInfo.fullname}}</span>
							<i> <img src="/dist/fonts/emotion/svg/Verified.svg" alt="" /> </i>
						</div>
						<div class="w-100"></div>
						<router-link to="#" class="ass1-head-user__btn-follow ass1-btn" v-if='!isCurrentUser'>Theo dõi</router-link>
						<template v-if='isCurrentUser'>
							<router-link 
								:to="{name: 'change-password', params:{id: currUser.USERID}}"
								class="ass1-head-user__btn-follow ass1-btn">
									Đổi mật khẩu
							</router-link>
							<router-link 
								:to="{name: 'user-profile', params:{id: currUser.USERID}}" 
								class="ass1-head-user__btn-follow ass1-btn">
									Profile
							</router-link>
						</template>

						<!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
					</div>
					<div class="ass1-head-user__info-statistic">
						<div class="ass1-btn-icon">
							<i class="icon-Post"></i><span>Bài viết: {{countPost}}</span>
						</div>
						<div class="ass1-btn-icon">
							<i class="icon-Followers"></i><span>Theo dõi: 99999</span>
						</div>
						<div class="ass1-btn-icon">
							<i class="icon-Following"></i><span>Đang theo dõi: 999</span>
						</div>
						<!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
					</div>
					<p>{{userInfo.description}}</p>
				</div>
			</div>
		</div>
		<!-- <div class="text-center" v-else>khong tim thay user</div> -->
		<router-link :to="{name: 'user-page', params:{id:141}}">333333333333333333</router-link>
		<!--sections-->
		<div 
			v-if="listPostOfUser && listPostOfUser.length"
			>
			
			<div class="grid-sizer"></div>
			
			<post-item 
				
				v-for="item in listPostOfUser"
				v-bind:key="item.PID"
				v-bind:list="item"
				class="col-lg-12"
			/>

		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import PostItem from "../components/PostItem.vue";
export default {
	name: "user-page",
	data(){
		return {
			id: parseInt(this.$route.params.id),
			userInfo:{},
			listPostOfUser:{}
		}
	},
	watch:{
		'$route'(to, from){
			this.id = parseInt(to.params.id);
			this.fetchDataUser(this.id)
		}
	},
	created(){
		this.id= parseInt(this.$route.params.id);
		this.fetchDataUser(this.id)
	},
	components: {
		PostItem,
	},
	computed:{
		...mapGetters(['currUser', 'getListPostOfCurrUser']),
		...mapState({'posts': state => state.moduleUser.posts,
		
		'user':state=>state.moduleUser.users}),
		getPosts(){
			return this.posts[this.id]
		},
		isCurrentUser(){
			if(this.currUser && this.userInfo){
				return parseInt(this.currUser.USERID) == parseInt(this.userInfo.USERID) ? true : false;
			}
		},
		countPost(){
			// if(this.posts[this.id]){
			// 	return this.posts[this.id].length
			// }
			if(this.listPostOfUser){
				return this.listPostOfUser.length;
			}
			return 0;
		}
	},
	methods:{
		...mapActions(['getListPostByUserID','getUserById',]),
		...mapMutations(['setLoading']),
		async fetchDataUser(id){
			this.setLoading(true)
			let promiseUser   	=	this.getUserById(id);
			let promisePostUser =	this.getListPostByUserID(id);
			let [resultUser, resultPostUser] = await Promise.all([promiseUser,promisePostUser])
			this.setLoading(false)
			//console.log('1223',resultUser, resultPostUser)
			if(resultUser.ok&&resultPostUser.ok){
				this.userInfo = resultUser.data;
				this.listPostOfUser = resultPostUser.data;
			}
			else{
				this.$router.push('/')
			}
		},
	}

};
</script>

<style>
</style>