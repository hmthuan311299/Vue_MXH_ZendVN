<template>
    <aside class="ass1-aside">
        <div class="ass1-content-head__t">
            <div>Bài viết gần đây của bạn.</div>
        </div>
        <div  v-if="!isLogin">Vui lòng đăng nhập để xem nội dung này
            <router-link to="/login">Đăng nhập</router-link>
>
        </div>
        <div v-else-if ="isLogin && getListPostOfCurrUser">
            <post-item v-for="post in getListPostOfCurrUser" :key="post.PID" :list="post" />
        </div>
    </aside>
</template>

<script>
import {mapGetters} from 'vuex'
import PostItem from './PostItem.vue'
export default {
    name: 'side-bar',
    computed:{
        ...mapGetters(['getListPostOfCurrUser', 'isLogin'])
    },
    components:{
        PostItem
    }
}
</script>

<style>

</style>