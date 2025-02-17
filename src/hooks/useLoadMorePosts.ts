import {Ref, ref, watch} from "vue";
import {Post} from "@/pages/PostsPage.vue";
import axios from "axios";

export function useLoadMorePosts(_posts: Ref<Post[]>, limit: number) {
  const page = ref(1);
  const newPosts = ref<Post[]>([]);

  const loadMorePosts = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _page: page.value += 1,
          _limit: limit
        }
      });

      if (response.data.length) {
        newPosts.value = response.data;
      }
    } catch (e) {
      console.log('Error get Posts');
    }
  };

  watch(newPosts, (newData) => {
    if (newData.length) {
      _posts.value = [..._posts.value, ...newData];
    }
  });

  return {
    loadMorePosts,
  };
}