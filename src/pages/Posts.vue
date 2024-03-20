<script lang="ts">
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
import PostFilter from "@/components/UI/PostFilter.vue";
import PostInput from "@/components/UI/PostInput.vue";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export default {
    components: {
      PostInput,
      PostFilter,
      PostDialog,
      PostList,
      PostForm,
    },
    data() {
      return {
        posts: [],
        show: false,
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
      }
    },
    methods: {
      createPost(post: Post) {
        this.posts.push(post);
        this.show = false;
      },
      removePost(post: Post) {
        this.posts = this.posts.filter((p: unknown) => p.id !== post.id);
      },
      showDialog() {
        this.show = true;
      },
      async fetchPosts() {
        try {
          this.isLoading = true;
          setTimeout(async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data;
            this.isLoading = false;
          }, 1000);
        } catch (e) {
          alert('Error get Posts')
        }
      },
      async loadMorePosts() {
        console.log('call loadMorePosts');
        try {
          this.page += 1;
          setTimeout(async () => {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
              params: {
                _page: this.page,
                _limit: this.limit
              }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
            this.posts = [...this.posts, ...response.data];
          }, 1000);
        } catch (e) {
          alert('Error get Posts')
        }
      }
    },
    mounted() {
      this.fetchPosts();
    },
    computed: {
      sortedPosts() {
        return [...this.posts].sort((p1, p2) => {
          return p1[this.selectedSort]?.localeCompare(p2[this.selectedSort])
        })
      },
      sortedByTitle() {
        return this.sortedPosts.filter((p: Post) => p.title.toLowerCase().includes(this.searchTitle.toLowerCase()))
      }
    },
    watch: {
      // page() {
      //   this.fetchPosts();
      // }
    }
  }
</script>

<template>
  <div class="app-container">
    <h3>Post list</h3>
    <post-input
        v-focus
        v-model="searchTitle"
        placeholder="Search..."
    />
    <div class="app__btn">
      <post-button @click="showDialog">Create post</post-button>
      <post-filter
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <post-dialog v-model:show="show">
      <post-form @create="createPost"/>
    </post-dialog>
    <TransitionGroup name="list">
      <post-list v-if="!isLoading" :posts="sortedByTitle" @remove="removePost"/>
      <h3 v-else>Loading...</h3>
    </TransitionGroup>
    <div v-intersection="{loadPosts: loadMorePosts, page, totalPages}" class="observer"></div>
  </div>
</template>

<style scoped>
.app__btn {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 1px;
  opacity: 0;
}

</style>