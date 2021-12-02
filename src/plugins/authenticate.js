import store from '../store'
//chua dang nhap va dang ky
const ifNotLogin = (to, from, next) => {
    if (store.getters.isLogin === false) {
        next()
    } else {
        next({ path: '/', query: { redirect: to.name } })
    }
}
const ifLogin = (to, from, next) => {
    if (store.getters.isLogin === true) {
        next()
    } else {
        next({ path: '/login', query: { redirect: to.name } })
    }
}
export {
    ifNotLogin,
    ifLogin
}