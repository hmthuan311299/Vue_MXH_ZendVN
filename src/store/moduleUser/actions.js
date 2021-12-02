import axios_instance from "../../plugins/axios"
import { parseJwt } from "../../helpers"
import { setToken } from "../../contanst"
export default {
    async getUserById(context, userid = 2) {
        try {
            var result = await axios_instance.get(`/member/member.php?userid=${userid}`)
            if (result.data && result.data.status == 200) {
                context.commit('SET_USER_INFO', result.data.user)
                return {
                    ok: true,
                    data: result.data.user,
                    error: null
                }
            }
        } catch (error) {
            return {
                ok: false,
                data: null,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = '' }) {
        try {
            commit('setLoading', true);
            var data = {
                email: email,
                password: password
            }
            var result = await axios_instance.post('/member/login.php', data)
                //console.log(result)
            commit('setLoading', false);
            if (result.data && result.data.status == 200) {

                // if (resultPostsbyUser.ok) {
                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data)
                dispatch('getListPostByUserID', result.data.user.USERID)
                return {
                    ok: true,
                    error: null,
                    data: result.data
                }
                //}

            } else {
                commit('setLoading', false);
                // console.log({ ok: false, error: result.data.error })
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('setLoading', false);
            //console.log("ddd")
            return {
                ok: false,
                error: result.data.error
            }
        }
    },
    async checkLogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(setToken)
            let userObj = parseJwt(tokenLocal)
                // console.log('tokenLocal', tokenLocal, userObj)
            if (userObj) {
                // let result = await dispatch('getUserById', userObj.id)
                // let resultPostUserId = await dispatch('getListPostByUserID', userObj.id)
                // 2 api chay doc lap
                let promiseUser = dispatch('getUserById', userObj.id)
                let promisePosts = dispatch('getListPostByUserID', userObj.id)
                let [result, resultPostUserId] = await Promise.all([promiseUser, promisePosts])
                    // console.log('getUserById', result)
                if (result.ok && resultPostUserId.ok) {
                    let data = {
                            user: result.data,
                            token: tokenLocal
                        }
                        //console.log('getUserById', data)
                    commit('SET_LOGIN_INFO', data);
                }
                return {
                    ok: true,
                    data: result.data,
                    error: null
                }
            }
            return {
                ok: false,
                data: null
            }
        } catch (error) {
            return {
                ok: false,
                data: null,
                error: error.message
            }
        }
    },
    async getLogout(context) {
        context.commit('SET_LOGOUT')
        return {
            ok: true
        }
    },
    async getListPostByUserID({ commit }, userid) {
        try {
            let config = {
                params: {
                    userid: userid,
                },
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(setToken)}`
                }
            }
            let result = await axios_instance.get('/post/getListPostUserID.php', config)
                //console.log('getListPostByUserID', result.data.posts)
            if (result.data && result.data.status == 200) {
                let obj = {
                    userid: userid,
                    posts: result.data.posts
                }
                commit('SET_POSTS_INFO', obj)
                return {
                    ok: true,
                    error: null,
                    data: result.data.posts
                }
            }
            return {
                ok: false,
                error: null,
                data: null
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit }, data) {
        try {
            commit('setLoading', true);
            let result = await axios_instance.post('/member/register.php', data)
            console.log(result, result.data.error)
            commit('setLoading', false);
            if (result.data.status == 200) {
                return {
                    ok: true,
                    data: result.data.message,
                }
            }
            return {
                ok: false,
                data: result.data.error
            }
        } catch (error) {
            commit('setLoading', false);
            return {
                ok: false,
                data: error.message
            }
        }
    },
    async checkUser() {
        try {
            let tokenLocal = localStorage.getItem(setToken)
            let userObj = parseJwt(tokenLocal)
            if (userObj) {   
                return {
                    ok: true,
                    currId: userObj.id,
                    error: null
                }
            }
        } catch (error) {
            return {
                ok: false,
                currId: null,
                error: error.message
            }
        }
    },
    async updateFile({commit}, {fullname='', description='', gender='',avatar=null}){
        try {
            console.log('this.fullname',fullname);
            commit('setLoading', true);
            let bodyFormData = new FormData();
            bodyFormData.append("fullname", fullname);
            bodyFormData.append("description", description);
            bodyFormData.append("gender", gender);
            if(avatar){
                bodyFormData.append('avatar', avatar)
            }

            let config={
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem(setToken)}`
                }
            }
            let result = await axios_instance.post('/member/update.php', bodyFormData, config);
            commit('setLoading', false);
            if(result.data && result.data.status==200){
                commit('SET_CURR_USER', result.data.user)
                return{
                    ok: true,
                    user: result.data.user
                }
            }
            return{
                ok: false,
                user: null,
                error: result.data.error
            }
        } catch (error) {
            commit('setLoading', false);
            return{
                ok: false,
                user: null
            }
        }
    },
    async changePassword({commit}, data){
        commit('setLoading', true);
        try {
            console.log(data);
            let config={
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(setToken)}`
                }
            }
            var result = await axios_instance.post('/member/password.php', data, config);
            
            commit('setLoading', false);
                if(result.data.status==200){
                    return{
                        ok: true,
                        message: result.data.message
                    }
                }
                else{
                    return{
                        ok: false,
                        error: result.data.error
                    }
                
                } 
        } catch (error) {
            commit('setLoading', false);
            return{
                ok: false,
                error: 'Mat Khau cu khong dung, xin moi nhap lai'
        }

      }
    }
}