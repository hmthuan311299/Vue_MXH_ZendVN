export default {
    isLogin: (state) => {
        if (state.ACCESS_TOKEN) {
            return true
        } else {
            return false;
        }
    },
    currUser: state => {
        return state.currUser;
    },

    getListPostOfCurrUser: state => state.currUser ? state.posts[state.currUser.USERID] : null
}