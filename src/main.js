import Vue from 'vue'
import App from './App.vue'
import './plugins';
import './assets/style.css'
import router from './router';
import store from './store'
// import Notifications from 'vue-notification'
// Vue.use(Notifications)
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(CKEditor);


// let result = fetch('http://api-meme-zendvn-01.herokuapp.com/api/post/getListPagination.php?pagesize=7&currPage=1')
// result.then(response => response.json()).then(data => console.log(data))

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})