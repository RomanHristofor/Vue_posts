import {ref, onMounted, Ref} from 'vue';
import {Post} from "@/pages/PostsPage.vue";
import axios from "axios";

export function usePosts(limit: number) {
  const posts: Ref<Post[]> = ref([]);
  const isLoading = ref(true);
  const totalPages = ref(0);
  const fetchPosts = async () => {
    try {
      setTimeout(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: 1,
            _limit: limit
          }
        });
        totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
        posts.value = [...posts.value, ...response.data];
      }, 1000);
    } catch (e) {
      alert('Error get Posts')
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(fetchPosts);

  return {
    posts,
    isLoading,
    totalPages
  }
}