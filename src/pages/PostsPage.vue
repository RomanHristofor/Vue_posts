<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
import PostFilter from "@/components/UI/PostFilter.vue";
import PostInput from "@/components/UI/PostInput.vue";
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
import {defineComponent} from "vue";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  [key: string]: string | number;
}

interface SortOption {
  value: string;
  name: string;
}

export interface PostsState {
  post: Post;
  posts: Post[];
  isLoading: boolean;
  selectedSort: string;
  searchTitle: string;
  page: number;
  limit: number;
  totalPages: number;
  sortOptions: SortOption[];
}

export default defineComponent({
  components: {
    PostInput,
    PostFilter,
    PostDialog,
    PostList,
    PostForm,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: "posts/setPage",
      setSearchByTitle: "posts/setSearchByTitle",
      setSelectedSort: "posts/setSelectedSort",
      setPosts: "posts/setPosts",
      setTotalPages: "posts/setTotalPages",
    }),
    ...mapActions({
      loadMorePosts: "posts/loadMorePosts",
      fetchPosts: "posts/fetchPosts"
    }),
    createPost(post: Post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post: Post) {
      this.setPosts(this.posts.filter((p: Post) => p.id !== post.id));
    },
    showDialog() {
      this.show = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  unmounted() {
    this.setPage(1)
  },
  computed: {
    ...mapState('posts', {
      posts: (state: unknown) => (state as PostsState).posts,
      isLoading: state => (state as PostsState).isLoading,
      selectedSort: state => (state as PostsState).selectedSort,
      searchTitle: state => (state as PostsState).searchTitle,
      page: state => (state as PostsState).page,
      limit: state => (state as PostsState).limit,
      totalPages: state => (state as PostsState).totalPages,
      sortOptions: state => (state as PostsState).sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      sortedByTitle: "posts/sortedByTitle"
    })
  },
})
</script>

<template>
  <div class="app-container">
    <h3>Post list</h3>
    <post-input
        :model-value="searchTitle"
        @update:model-value="setSearchByTitle"
        v-focus
        placeholder="Search..."
    />
    <div class="app__btn">
      <post-button @click="showDialog">Create post</post-button>
      <post-filter
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <post-dialog v-model:show="show">
      <post-form @create="createPost"/>
    </post-dialog>
    <TransitionGroup name="list">
      <post-list v-if="!isLoading" :posts="sortedPosts" @remove="removePost"/>
      <h3 v-else>Loading...</h3>
    </TransitionGroup>
    <div class="observer"
         v-intersection="{
        loadPosts: loadMorePosts,
        totalPages,
      }"></div>
  </div>
</template>

<style scoped>
.app__btn {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 10px;
  background: teal;
  opacity: 1;
}

</style>
