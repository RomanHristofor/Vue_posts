import { createStore } from 'vuex'
import {postModule} from "@/store/postModule";
import {postsModule} from "@/store/postsModele";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    post: postModule,
    posts: postsModule
  }
})
