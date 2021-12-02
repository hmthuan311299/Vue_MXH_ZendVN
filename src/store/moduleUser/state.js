import { setToken } from "../../contanst"
export default {
    currUser: null, //LOGIN 
    ACCESS_TOKEN: localStorage.getItem(setToken),
    users: {},
    posts: {}
}