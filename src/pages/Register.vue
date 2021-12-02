<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <a href="index.html" class="ass1-logo">ZendVn Meme</a>
        </div>
        <!-- <notifications group="foo" /> -->
        <div class="ass1-login__content">
            <p>Đăng ký một tài khoản</p>
            <div class="ass1-login__form">
                <form action="#" v-on:submit.prevent='handleSubmitRegister()'>
                    <input v-model="fullname" type="text" class="form-control" placeholder="Tên hiển thị" required="">
                    <input v-model="email" type="email" class="form-control" placeholder="Email" required="">
                    <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required="">
                    <input v-model="repassword" type="password" class="form-control" placeholder="Nhập lại mật khẩu" required="">
                    <div class="ass1-login__send">
                        <a href="dang-nhap.html">Đăng nhập</a>
                        <button type="submit" class="ass1-btn">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'regiters',
    data(){
        return{
            fullname: '',
            email : '',
            password:'',
            repassword:''
    }
    },methods:{
        ...mapActions(['register']),
        handleSubmitRegister(){
            let data1 ={
                fullname: this.fullname,
                email: this.email,
                password: this.password,
                repassword: this.repassword
            }
            console.log('aaaaa');
            this.register(data1).then(res=>{
               
                if(!res.ok) alert(res.data)
                else{
                    // this.$notify({
                    //     group: 'foo',
                    //     title: 'Important message',
                    //     text: 'Hello user! This is a notification!'
                    // });
                }
            })
        }
    }
}
</script>

<style>

</style>