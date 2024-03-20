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
  <div class="post-view">
    <h3>Post {{$route.params.id}}</h3>
  </div>
</template>

<style scoped>

</style>