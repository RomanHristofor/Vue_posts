<script lang="ts" setup>
import PostItem from "@/components/PostItem.vue";
import {Post} from "@/pages/PostsPage.vue";

defineProps<{posts: Post[]}>();
</script>

<template>
  <div v-if="posts.length > 0">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
  <h3 v-else>Post list is empty</h3>
</template>
