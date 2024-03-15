<template>
  <div class="app-container">
    <h3>Post list</h3>
    <post-button @click="showDialog" style="margin: 15px 0;">Create post</post-button>
    <post-dialog v-model:show="show">
      <post-form @create="createPost"/>
    </post-dialog>
    <post-list v-if="!isLoading" :posts="posts" @remove="removePost"/>
    <h3 v-else>Loading...</h3>
  </div>
</template>

<script>
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import PostDialog from "@/components/UI/PostDialog.vue";
export default {
  components: {
    PostDialog,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      show: false,
      isLoading: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.show = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.show = true;
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
          this.posts = response.data;
          this.isLoading = false;
        }, 1000);
      } catch (e) {
        alert('Error get Posts')
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  padding: 20px
}
</style>
