<script lang="ts">
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <post-input v-focus placeholder="Title" v-model="post.title" />
    <post-input placeholder="Description" v-model="post.body" />
    <post-button
        style="align-self: flex-end; margin-top: 15px;"
        @click="createPost"
    >Add post</post-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

</style>