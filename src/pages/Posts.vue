<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
import PostFilter from "@/components/UI/PostFilter.vue";
import PostInput from "@/components/UI/PostInput.vue";
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  [key: string]: string | number;
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
      ...mapState({
        posts: state => state.posts.posts,
        isLoading: state => state.posts.isLoading,
        selectedSort: state => state.posts.selectedSort,
        searchTitle: state => state.posts.searchTitle,
        page: state => state.posts.page,
        limit: state => state.posts.limit,
        totalPages: state => state.posts.totalPages,
        sortOptions: state => state.posts.sortOptions,
      }),
      ...mapGetters({
        sortedPosts: "posts/sortedPosts",
        sortedByTitle: "posts/sortedByTitle"
      })
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
      <post-list v-if="!isLoading" :posts="sortedByTitle" @remove="removePost"/>
      <h3 v-else>Loading...</h3>
    </TransitionGroup>
    <div class="observer"
       v-intersection="{
        loadPosts: loadMorePosts,
        page,
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
  height: 1px;
  background: aqua;
  //opacity: 0;
}

</style>