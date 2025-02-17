import {ref, watchEffect, type Ref} from "vue";
import {Post} from "@/pages/PostsPage.vue";

export function useSortedPosts(posts: Ref<Post[]>) {
  const selectedSort = ref('');
  const sortedPosts = ref<Post[]>([]);

  watchEffect(() => {
    sortedPosts.value = [...posts.value].sort((p1, p2) =>
      selectedSort.value ? String(p1[selectedSort.value]).localeCompare(String(p2[selectedSort.value])) : 0
    );
  });

  return {
    selectedSort,
    sortedPosts
  };
}