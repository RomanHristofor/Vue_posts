<script lang="ts">
export default {
  name: 'post-button'
}
</script>

<template>
  <button class="btn" >
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  padding: 5px 10px;
  color: #090909;
  border: 1px solid teal;
}
</style>