export default {
    getListPost: state => state.listPosts,
    getPostDetails(state, getters, rootState) {
        // console.log("state", state);
        // console.log("getters", getters);
        // console.log("rootState", rootState);
        if (state.postDetails) {
            let USERID = state.postDetails.post.USERID;
            let user = rootState.moduleUser.users[USERID]
                // console.log("rootState", user);
            let post = {
                ...state.postDetails.post,
                fullname: user.fullname,
                profilepicture: user.profilepicture

            }
            let data = {
                post,
                categories: state.postDetails.categories,
                comments: state.postDetails.comments,
            }
            return data;
        }

    }
}
// export const getters = {
//     getListPost: state => state.listPosts
// }