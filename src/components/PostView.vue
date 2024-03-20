<script lang="ts">
import {mapState} from "vuex";
export default {
  computed: {
    ...mapState({
      post: state => state.post.post,
    }),
  }
}
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

<style scoped>

</style>