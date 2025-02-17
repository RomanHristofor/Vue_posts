import {ref, computed, type Ref} from "vue";
import {Post} from "@/pages/PostsPage.vue";

export function useSortedByTitle(sortedPosts: Ref<Post[]>) {
  const searchTitle = ref('');

  const filteredPosts = computed(() => {
    return sortedPosts.value.filter((p: Post) => p.title.toLowerCase().includes(searchTitle.value.toLowerCase()))
  })

  return {
    searchTitle,
    filteredPosts
  }
}