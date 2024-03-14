<script lang="ts">
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  },
}
</script>

<template>
  <div v-if="posts.length > 0">
    <h3>Post list</h3>
    <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
    />
  </div>
  <h3 v-else>Post list is empty</h3>
</template>

<style scoped>

</style>