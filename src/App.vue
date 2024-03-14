<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
  <div class="app-container">
    <post-form @create="createPost"/>
    <post-list :posts="posts" @remove="removePost"/>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 0, title: 'JS', body: 'JavaScript is a multi-paradigm programming language. Supports object-oriented, imperative and functional styles.'},
        {id: 1, title: 'Go', body: 'Go is a compiled multi-threaded programming language developed internally by Google.'},
        {id: 2, title: 'RUST', body: 'Rust is a multi-paradigm compiled general-purpose programming language.'},
      ],
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    removePost(post) {
      // console.log('App', post);
      this.posts = this.posts.filter((p) => p.id !== post.id);
    }
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




#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
