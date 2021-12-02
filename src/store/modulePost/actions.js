import axios_instance from "../../plugins/axios"
import { PAGE_SIZE, CURRENT_PAGE } from '../../contanst/index'
import { setToken } from "../../contanst"
import { data } from "jquery";
export default {
    async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {
        try {
            commit('setLoading', true);
            var config = {
                params: {
                    pagesize,
                    currPage
                }
            }
            if (tagIndex) {
                config.params.tagIndex = tagIndex;
                var result = await axios_instance.get('/post/getListByCategory.php', config)
            } else {
                var result = await axios_instance.get('post/getListPagination.php', config)
                    //console.log(result)
            }
            commit('setLoading', false);
            if (result.data && result.data.status == 200) {
                //commit
                if (currPage === 1) commit('SET_LIST_POSTS', result.data.posts)
                else if (currPage > 1) commit('PUSH_LIST_POSTS', result.data.posts)
            }

        } catch (error) {
            console.log('error', error)
        }
    },
    async getPostDetailById({ commit, dispatch }, postId) {
        try {
            commit('setLoading', true);
            var result = await axios_instance.get("/post/post.php?postid=" + postId)

            if (result.data && result.data.status == 200) {
                //goi tiep api cua user
                commit('setLoading', false);
                var PromisetUser = dispatch('getUserById', result.data.data.post.USERID);
                var PromiseComment = dispatch('getListCommentByPostid', postId)
                let [resultUser, resultComment] = await Promise.all([PromisetUser, PromiseComment]);
                
                if(resultComment.ok){
                    let dataPostDetail = {
                        ...result.data.data, 
                        comments: resultComment.comments
                    }
                    commit('SET_POST_DETAIL', dataPostDetail);
                }
                else{
                    let dataPostDetail = {
                        ...result.data.data,
                        comments: []
                    }
                    commit('SET_POST_DETAIL', dataPostDetail);
                }

                
                return {
                    ok: true,
                    data: result.data.data,
                    error: null
                }
            }
        } catch (error) {
            // commit('setLoading', false);
            // console.log('error', error);
            return {
                ok: false,
                error: error.message
            }

        }
    },
    async getListPostSearch({commit}, data){
        try {
            commit('setLoading', true);
            var result = await axios_instance.get("/post/search.php?query=" + data)
            commit('setLoading', false);
            if(result.data.status==200){
                return{
                    ok: true,
                    listPost: result.data.posts
                }
            }
        } catch (error) {
            commit('setLoading', false);
            return{
                ok: true,
                error: error.message
            }
        }
    },
    async createNewPost({commit}, {post_content='',category='', url_image='', obj_image=null}){
        commit('setLoading', true);
        try { 
            let config ={
                headers: {
                    'accept':'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem(setToken)}`
                }
            }
            var formData = new FormData();
            formData.append("post_content", post_content)
            formData.append("category", category)
            formData.append("url_image", url_image)
            if(obj_image){
                formData.append("obj_image", obj_image);
            }
            var result = await axios_instance.post("/post/addNew.php", formData, config)
            commit('setLoading', false);
            if(result.data.status ==200){
                return{
                    ok: true,
                    data: result.data.data // post - categories
                }
            }
            

        } catch (error) {
            commit('setLoading', false);
            return{
                ok: true,
                error: error.message
            }
        }
    },
    async getListCommentByPostid({commit},PiD){
        try {
            var result = await axios_instance.get(`/comment/comments.php?postid=${PiD}` )
            console.log("result", result);
            if(result.data && result.data.status==200){
                return{
                    ok: true,
                    comments: result.data.comments
                }
            }
        } catch (error) {
             return{
                ok: true,
                error: error.message
            }
        }
    },
    async addNewComment({commit, rootState}, {comment='', pid=null}){
        try {
            var data={
                comment,
                postid:pid
            }
            var config={
                headers:{
                    'accept':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(setToken)}`

                }
            }
            var result = await axios_instance.post("/comment/add_new.php", data, config);
            console.log("cmt", result.data)
            if(result.data.status ===200){
                let comment={
                    ...result.data.body, 
                    "fullname": rootState.moduleUser.currUser.fullname,
                    "profilepicture": rootState.moduleUser.currUser.profilepicture
                }
                commit('PUSH_LIST_COMMENT',comment);
                return{
                    ok: true,
                    comment: comment
                }
            }
            else{
                return{
                    ok: false,
                    message: "loi"
                }
            }

        } catch (error) {
            return{
                ok: true,
                error: error.message
            }
        }
    }
}