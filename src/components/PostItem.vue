<script lang="ts">
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/posts/${this.post.id}`);
      this.$store.commit('post/openPost', this.post)
    }
  }
}
</script>

<template>
  <div class="post">
    <div class="post__id">{{ post.id }}</div>
    <div><strong>Title:</strong> {{ post.title }}</div>
    <div><strong>Description:</strong> {{ post.body }}</div>
    <post-button @click="openPost" style="margin-right: 10px;">Open</post-button>
    <post-button @click="$emit('remove', post)">Remove</post-button>
  </div>
</template>

<style scoped>
.post {
  padding: 20px;
  border: 1px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__id {
  margin-right: 10px;
}
</style>