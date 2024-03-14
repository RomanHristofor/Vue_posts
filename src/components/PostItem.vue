<script lang="ts">
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
  }
}
</script>

<template>
  <div class="post">
    <div><strong>Title: {{ post.title }}</strong></div>
    <div><strong>Description: {{ post.body }}</strong></div>
    <post-button @click="$emit('remove', post)">Remove</post-button>
  </div>
</template>

<style scoped>
.post {
  padding: 10px;
  border: 1px solid pink;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>