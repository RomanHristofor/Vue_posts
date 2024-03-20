import {ref, computed} from "vue";
import {Post} from "@/pages/Posts.vue";

export function useSortedByTitle(sortedPosts: Post[]) {
    const searchTitle = ref('');

    const filteredPosts = computed(() => {
        return sortedPosts.value.filter((p: Post) => p.title.toLowerCase().includes(searchTitle.value.toLowerCase()))
    })

    return {
        searchTitle,
        filteredPosts
    }
}