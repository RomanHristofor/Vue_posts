<script lang="ts">
import {defineComponent} from 'vue';
import {mapState} from "vuex";
import {PostsState} from "@/pages/PostsPage.vue";

export default defineComponent({
  computed: {
    ...mapState({
      post: (state: unknown) => (state as PostsState).post.post,
    }),
  }
})
</script>

<template>
  <div class="post-view">
    <div v-if="post">
      <div>{{ post.id }}</div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>
  </div>
</template>
