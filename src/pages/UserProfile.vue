<template>
    <div class="ass1-login">
        
        <div class="ass1-login__content">
            <p>Profile</p>
            <div class="ass1-login__form">
                <div class="avatar">
                    <img :src='getAvatarUrl' alt="">
                </div>
                <form action="#" v-if="currUser" v-on:submit.prevent="handleEditProfile()">
                    <input 
                        v-bind:value="currUser.fullname"
                        v-on:input="fullname = $event.target.value"
                        type="text" class="form-control" 
                        placeholder="Tên ..." required="">
                    
                    <select  class="form-control" 
                    v-on:change="gender = $event.target.value"
                    :value="currUser.gender">
                        <option value="" disabled >Giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                    </select>

                    <input v-on:change="upLoadAvatar($event)" type="file" name="avatar"  placeholder="Ảnh đại diện" class="form-control">

                    <textarea 
                    v-bind:value="currUser.description"
                    v-on:input="description = $event.target.value"
                    class="form-control" cols="30" rows="5" placeholder="Mô tả ngắn ..."></textarea>

                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
    name: 'user-profile',
    data(){
        return{
            id: this.$route.params.id,
            fullname:'',
            description:'',
            avatar: {
                objFile: null,
                base64URL: ''
            },
            gender: ''
        }
    },
    // created(){
    //     this.checkLogin().then(res=>{
    //     if(this.id != res.data.USERID){
    //         this.$router.push({name: 'user-profile', params:{id: this.currUser.USERID}})
    //     }
    // })
    // },
    created(){
        this.id = this.$route.params.id;
        this.checkUser().then(res=>{
            //console.log("res", res)
            if(res.currId != this.id){
                this.$router.push({name: 'user-profile', params:{id: res.currId}})
            }
        });

    },
    watch:{
        '$route'(to,from){
            this.id= to.params.id;
            this.checkIsCurrUser()
        }
    },
    computed:{
        ...mapGetters(['currUser',]),
        getUserInfor(){
            if(this.currUser){
                return this.currUser
            }
        },
        getAvatarUrl(){
            if(this.avatar.base64URL===""){
                if(this.currUser)
                return this.currUser.profilepicture || `/dist/images/food-1631727_1920.jpg`;
                return `/dist/images/food-1631727_1920.jpg`;
            }
            return this.avatar.base64URL;
        }
       
    },
    methods:{
        ...mapActions(['checkLogin', 'checkUser','updateFile']),
        checkIsCurrUser(){
            if(this.id && this.currUser){
                //console.log('checkIsCurrUser',this.id, this.currUser.USERID)
                if(this.id != this.currUser.USERID){
                    this.$router.push({name: 'user-profile', params:{id: this.currUser.USERID}})
                }
            }
        },
        // handleGetFullName(data){
        //     this.fullname = data
        //      console.log('this.fullname', this.fullname)
        // },
        handleEditProfile(){
            if(!this.fullname) this.fullname = this.currUser.fullname;
            if(!this.gender) this.gender = this.currUser.gender;
            if(!this.description) this.description = this.currUser.description;
            if(this.fullname && this.gender && this.description){
                let data ={
                    fullname:this.fullname ,
                    gender : this.gender,
                    description : this.description,
                    avatar : this.avatar.objFile
                }
                 console.log('this.fullname',data);
                this.updateFile(data);
            }
        },
        upLoadAvatar(e){
            console.log(e.target.files[0])
            if(e.target.files && e.target.files.length){ //e.target.files.length !== 0
                const fileAvatar = e.target.files[0]
                let reader = new FileReader();

                reader.addEventListener("load", ()=>{
                    let preview = reader.result;
                    console.log("previewSRc", preview)
                    this.avatar.base64URL = preview;
                    this.avatar.objFile = fileAvatar;
                }, false);
                if(fileAvatar){
                    reader.readAsDataURL(fileAvatar);
                }
                
            }
        }
        
    }
}
</script>

<style>

</style>