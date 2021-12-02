import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
    // module
import moduleUser from './moduleUser'
import modulePost from './modulePost'

import getters from './getters'
import actions from './actions'
const store = new Vuex.Store({
    state: { isLoading: false },
    getters,
    mutations: {
        setLoading: (state, value) => { state.isLoading = value }
    },
    actions,
    modules: {
        moduleUser,
        modulePost
    }
})
export default store;