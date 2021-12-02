<template>
    <div class="ass1-login">
        <div class="ass1-login__content">
            <p>Đổi mật khẩu</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent="handleChangePassword">
                    <input v-model='oldPassword' type="password" class="form-control" placeholder="Mật khẩu cũ" required="">
                    <input v-model='newPassword' type="password" class="form-control" placeholder="Mật khẩu mới" required="">
                    <input v-model='reNewPassword' type="password" class="form-control" placeholder="Xác nhận mật khẩu mới" required="">
                    <div class="ass1-login__send justify-content-center">
                        <button type="submit" class="ass1-btn">Gửi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'change-password',
    data(){
        return{
            id: this.$route.params.id,
            oldPassword: '',
            newPassword: '',
            reNewPassword:'',
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.checkUser().then(res=>{
            //console.log("res", res)
            if(res.currId != this.id){
                this.$router.push({name: 'change-password', params:{id: res.currId}})
            }
        });

    },
    watch:{
        '$route'(to,from){
            this.id= to.params.id;
            this.checkIsCurrUser()
        }
    },
    methods:{
        ...mapActions(['checkUser','changePassword']),
        checkIsCurrUser(){
            if(this.id && this.currUser){
                //console.log('checkIsCurrUser',this.id, this.currUser.USERID)
                if(this.id != this.currUser.USERID){
                    this.$router.push({name: 'change-password', params:{id: this.currUser.USERID}})
                }
            }
        },
        handleChangePassword(){
            let {oldPassword,newPassword, reNewPassword} = this;
            if(oldPassword && newPassword && reNewPassword){
                if(oldPassword == newPassword){
                    alert("MK cu khong duoc trung voi mat khau moi");
                }
                else if(newPassword != reNewPassword){
                    alert("MK nhap lai khong dung");
                }else{
                    let data={
                        oldPassword,
                        newPassword,
                        reNewPassword
                    }
                    this.changePassword(data).then(res=>{
                        if(res.ok){
                            alert(res.message)
                        }
                        else 
                            alert(res.error)
                    })
                }
            }
            else{
                alert('Can nhap du thong tin')
            }
        }
    }
}
</script>

<style>

</style>