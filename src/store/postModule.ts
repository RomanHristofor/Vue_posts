import {Post} from "@/pages/Posts.vue";

export const postModule = {
    namespaced: true,
    state: () => ({
        post: null,
    }),
    getters: {
    },
    mutations: {
        openPost(state: { post: Post; }, post: Post) {
            state.post = post
        }
    },
    actions: {
    }
}