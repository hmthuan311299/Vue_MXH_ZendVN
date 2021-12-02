<template>
  <div class="row">
				<div class="col-lg-8">
					<!--section-->
					<div class="ass1-section ass1-section__edit-post">
						<div class="ass1-section__content">
							<form action="#">
								<div class="form-group">
									<input v-model='url_image' type="text" class="form-control ttg-border-none" placeholder="https://">
								</div>
								<div class="form-group">
									<textarea v-model='post_content' type="text" class="form-control ttg-border-none"
										placeholder="Mô tả ..."></textarea>
								</div>
							</form>
							<div class="ass1-section__image">
								<img :src="renderImage" alt="default">
							</div>
							<a href="https://memeful.com/" target="_blank" class="ass1-btn ass1-btn-meme">Chế ảnh từ
								meme</a>
							<a class="ass1-btn ass1-btn-meme text-white" @click="handleUpdateIMG()">Đăng ảnh từ máy tính</a>
							<input type="file" ref="upLoadImage" v-on:change="handleUpLoadImage($event)" style='display:none'>
						</div>
					</div>
				</div>
				
				<div class="col-lg-4">
					<aside class="ass1-aside ass1-aside__edit-post">
						<div>
							<button @click="handleUpLoadPost" class="ass1-btn">Đăng bài</button>
						</div>
						<div class="ass1-aside__edit-post-head">
							<span style="display: block; width: 100%; margin-bottom: 10px;">Chọn danh mục</span>
							<label class="ass1-checkbox" v-for="item in allCategories" :key='item.id'>
								<input type="checkbox" :value='item.id' v-model='catelogies'>
								<span></span>
								<p>{{item.text}}</p>
							</label>
						</div>
						<div class="ass1-aside__get-code">
							<p>Share Link</p>
						</div>
						<div class="ass1-aside__social">
							<a href="" class="ass1-btn-social__facebook ass1-btn-social"><i class="fa fa-facebook"
									aria-hidden="true"></i></a>
							<a href="" class="ass1-btn-social__twitter ass1-btn-social"><i class="fa fa-twitter"
									aria-hidden="true"></i></a>
							<a href="" class="ass1-btn-social__google ass1-btn-social"><i class="fa fa-google-plus"
									aria-hidden="true"></i></a>
						</div>

					</aside>
				</div>
			</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {checkImageURL, checkImageFile} from '../helpers/index'
export default {
    name: 'post-upload',
	data(){
		return{
			post_content:'',
			url_image: '',
			obj_image:{
				objFile: null,
				base64URL: ''
			},
			catelogies:[]
		}
	},
	computed:{
		...mapState({
			'allCategories': state => state.modulePost.categories
		})
		// allCatelogies(){
		// 	return this.$store.state.modulePost.categories;
		// }
		, renderImage(){
			//uu tien lay link ben ngoai
			if(this.url_image){
				return this.url_image
			}
			else if(this.obj_image.base64URL){
				return this.obj_image.base64URL;
			}
			return '/dist/images/no_image_available.jpg'
		}
	},
	methods:{
		...mapActions(['createNewPost']),
		handleUpdateIMG(){
			this.$refs.upLoadImage.click();
		},
		handleUpLoadImage(e){
			if(e.target.files && e.target.files.length){
				const imgUpload = e.target.files[0]
				const reader = new FileReader();
				let checkFile = checkImageFile(imgUpload);
				if(!checkFile){
					alert('File khong hop le');
					return;
				}
				reader.addEventListener("load", ()=>{
					// convert image file to base64 string
					let preview = reader.result;
					this.obj_image.base64URL = preview;
					this.obj_image.objFile= imgUpload;
				}, false);

				if (imgUpload) {
					reader.readAsDataURL(imgUpload);
				}
			}
		},
		handleUpLoadPost(){
			let {post_content,catelogies, url_image, obj_image } = this;
			if(post_content && catelogies.length){
				if(url_image || obj_image.objFile){
					let data =
					{ 
						post_content,
						category: catelogies, 
						url_image, 
					}
					if(obj_image.objFile){
						data.obj_image = obj_image.objFile;
					}
					this.createNewPost(data).then((res)=>{
						if(res.ok){
							//reset toan bo data
							this.post_content='',
							this.url_image= '',
							this.obj_image.objFile=null,
							this.obj_image.base64URL='',
							this.catelogies=[];
						}
						else{
							alert("Dang bai viet thanh cong");
						}
					})
				}else{
					alert('vui long UPLOAD hinh anh')
				}
			}else{
				alert('vui long nhap day du noi dung')
			}
		}
	}
}
</script>

<style>
	.text-white:hover{
		color:blue
	}
</style>