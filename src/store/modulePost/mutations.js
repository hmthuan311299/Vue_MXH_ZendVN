export default {
    SET_LIST_POSTS(state, data) {
        state.listPosts = data
    },
    PUSH_LIST_POSTS(state, data) {
        state.listPosts = [...state.listPosts, ...data]
    },
    SET_POST_DETAIL(state, data) {
        console.log("mutation", data)
        state.postDetails = data
    },
    PUSH_LIST_COMMENT(state, comment){
        state.postDetails.comments.push(comment)
    }
}