import {ref, computed} from "vue";
import {Post} from "@/pages/Posts.vue";

export function useSortedPosts(posts: Post[]) {
    const selectedSort = ref('');

    const sortedPosts = computed(() => {
        return [...posts.value].sort((p1, p2) => {
            return p1[selectedSort.value]?.localeCompare(p2[selectedSort.value])
        })
    })

    return {
        selectedSort,
        sortedPosts
    }
}