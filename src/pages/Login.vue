<template>
    <div class="ass1-login">
        <div class="ass1-login__logo">
            <a href="index.html" class="ass1-logo">ZendVn Meme</a>
        </div>
        <div class="ass1-login__content">
            <p>Đăng nhập</p>
            <div class="ass1-login__form">
                <form action="#" @submit.prevent="handleSubmitLogin" >
                    <input v-model="email" type="text" class="form-control" placeholder="Email" required="">
                    <div class="ass1-input-copy">
                        <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu" required="">
                        <a href="#">Copy</a>
                    </div>
                    <div class="ass1-login__send">
                        <a href="dang-ky.html">Đăng ký một tài khoản</a>
                        <button type="submit" class="ass1-btn">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'login',
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        ...mapActions(['login']),
        handleSubmitLogin(){
            let data ={
                    email: this.email,
                    password: this.password
            }
            this.login(data).then(res=>{
                console.log(res.ok)
                if(!res.ok){
                    if(typeof res.error=="string"){
                        alert(res.error);
                    }
                    else alert(res.error.join('-'));
                }
                else{
                    this.$router.push("/")
                }
            });
            
        }
    },
    computed:{
        ...mapGetters(['isLogin'])
    }
}
</script>

<style>

</style>