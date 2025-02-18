<script lang="ts" setup>
import {inject, ref} from 'vue';

const post = ref({ title: '', body: '' })

const createPost = inject('create');
</script>

<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <post-input v-focus placeholder="Title" v-model="post.title" />
    <post-input placeholder="Description" v-model="post.body" />
    <post-button class="add-post__btn" @click="() => createPost(post)"
    >Add post</post-button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
.add-post__btn {
  align-self: flex-end;
  margin-top: 15px;
}
</style>