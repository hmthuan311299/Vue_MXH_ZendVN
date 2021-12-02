import Vue from 'vue'
import { setToken } from "../../contanst"
export default {
    SET_USER_INFO(state, user) {
        // console.log(state, user.USERID, user)
        Vue.set(state.users, user.USERID, user)
    },
    SET_POSTS_INFO(state, { posts, userid }) {
        //console.log('ahihi', posts)
        Vue.set(state.posts, userid, posts)
    },
    SET_LOGIN_INFO(state, data) {
        localStorage.setItem(setToken, data.token)
        state.ACCESS_TOKEN = data.token;
        state.currUser = data.user

    },
    SET_LOGOUT: (state) => {
        state.currUser = null;
        state.users = {};
        state.ACCESS_TOKEN = ''
        localStorage.removeItem(setToken);
        // currUser: null, //LOGIN 
        // users: {},
        // ASSERTS_TOKEN: ''
    },
    SET_CURR_USER:(state, inforUser)=>{
        state.currUser = inforUser;
    }


}