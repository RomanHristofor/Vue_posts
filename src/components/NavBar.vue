<script lang="ts">
import PostButton from "@/components/UI/PostButton.vue";

export default {
  components: {PostButton}
}
</script>

<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btn">
      <post-button @click="$router.push('/posts')">Posts</post-button>
      <post-button @click="$router.push('/about')">About</post-button>
      <post-button @click="$router.push('/composition')">Composition</post-button>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  height: 50px;
  background: teal;
  box-shadow: 2px 2px 4px #797979;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btn {
  margin-left: auto;
}
</style>