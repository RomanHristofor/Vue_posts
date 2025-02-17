<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
import PostFilter from "@/components/UI/PostFilter.vue";
import PostInput from "@/components/UI/PostInput.vue";
import {usePosts} from "@/hooks/usePosts";
import {useSortedPosts} from "@/hooks/useSortedPosts";
import {useSortedByTitle} from "@/hooks/useSortedByTitle";
import {defineComponent} from "vue";
import {useLoadMorePosts} from "@/hooks/useLoadMorePosts";

const LIMIT_POST = 20;

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
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
      sortOptions: [
        {value: 'title', name: 'by title'},
        {value: 'body', name: 'by description'}
      ]
    }
  },
  methods: {
    showDialog() {
      this.show = true;
    },
    createPost(post: Post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post: Post) {
      this.posts = this.posts.filter((p: Post) => p.id !== post.id);
    },
  },
  setup() {
    const {posts, totalPages, isLoading} = usePosts(LIMIT_POST);
    const {loadMorePosts} = useLoadMorePosts(posts, LIMIT_POST);
    const {selectedSort, sortedPosts} = useSortedPosts(posts);
    const {searchTitle, filteredPosts} = useSortedByTitle(sortedPosts);


    const updateSelectedSort = (newValue: string) => {
      selectedSort.value = newValue;
    };

    const updateSearchByTitle = (newValue: string) => {
      searchTitle.value = newValue;
    };

    return {
      posts,
      totalPages,
      isLoading,
      selectedSort,
      sortedPosts,
      updateSelectedSort,
      searchTitle,
      filteredPosts,
      updateSearchByTitle,
      loadMorePosts,
    }
  },
})
</script>

<template>
  <div class="app-container">
    <h3>Posts [Composition]</h3>
    <post-input
        v-model.trim="searchTitle"
        @update="updateSearchByTitle"
        v-focus
        placeholder="Search..."
    />
    <div class="app__btn">
      <post-button @click="showDialog">Create post</post-button>
      <post-filter
          v-model="selectedSort"
          @update="updateSelectedSort"
          :options="sortOptions"
      />
    </div>
    <post-dialog v-model:show="show">
      <post-form @create="createPost"/>
    </post-dialog>
    <TransitionGroup name="list">
      <post-list
          v-if="!isLoading"
          :posts="filteredPosts"
          @remove="removePost"
      />
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
  height: 0px;
  background: teal;
  opacity: 0;
}

</style>