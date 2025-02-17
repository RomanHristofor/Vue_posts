<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['create'],
  data() {
    return {
      post: {
        title: '',
        body: '',
      } as { title: string; body: string; id?: number },
    }
  },
  methods: {
    createPost() {
      this.post = { ...this.post, id: Date.now() };
      this.$emit('create', this.post);

      this.post = {
        title: '',
        body: '',
      }
    }
  }
})
</script>

<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <post-input v-focus placeholder="Title" v-model="post.title" />
    <post-input placeholder="Description" v-model="post.body" />
    <post-button
        class="add-post__btn"
        @click="createPost"
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