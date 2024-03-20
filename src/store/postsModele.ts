import { Commit } from 'vuex';
import {Post} from "@/pages/Posts.vue";
import axios from "axios";
interface State {
    posts: Post[];
    page: number;
    limit: number;
}
export const postsModule = {
    namespaced: true,
    state: () => ({
        posts: [],
        isLoading: false,
        selectedSort: '',
        searchTitle: '',
        page: 1,
        limit: 20,
        totalPages: 0,
        sortOptions: [
            {value: 'title', name: 'by title'},
            {value: 'body', name: 'by description'}
        ]
    }),
    getters: {
        sortedPosts(state: { posts: Post[]; selectedSort: string }) {
            return [...state.posts].sort((p1, p2) => {
                // @ts-ignore
                return p1[state.selectedSort]?.localeCompare(p2[state.selectedSort])
            })
        },
        sortedByTitle(state: { searchTitle: string; }, getters: { sortedPosts: Post[]; }) {
            return getters.sortedPosts.filter((p: Post) => p.title.toLowerCase().includes(state.searchTitle.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state: { posts: Post[]; }, posts: Post[]) {
            state.posts = posts
        },
        setLoading(state: { isLoading: boolean; }, bool: boolean) {
            state.isLoading = bool
        },
        setSelectedSort(state: { selectedSort: string; }, str: string) {
            state.selectedSort = str
        },
        setSearchByTitle(state: { searchTitle: string; }, str: string) {
            state.searchTitle = str
        },
        setPage(state: { page: number; }, num: number) {
            console.log('setPage', num);
            state.page = num
        },
        setTotalPages(state: { totalPages: number; }, num: number) {
            console.log('setTotalPages', num);
            state.totalPages = num
        },
    },
    actions: {
        async fetchPosts({ state, commit }: { state: State; commit: Commit }) {
            try {
                commit('setLoading', true);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                    commit('setPosts', response.data);
                    commit('setLoading', false);
                }, 1000);
            } catch (e) {
                alert('Error get Posts')
            }
        },
        async loadMorePosts({ state, commit }: { state: State; commit: Commit }) {
            try {
                commit('setPage', state.page += 1);
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                    });
                    commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                    commit('setPosts', [...state.posts, ...response.data]);
                }, 1000);
            } catch (e) {
                alert('Error get Posts')
            }
        }
    }
}