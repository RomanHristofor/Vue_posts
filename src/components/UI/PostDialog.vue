<script lang="ts" setup>
import PostForm from "@/components/PostForm.vue";
import {provide} from "vue";
import {Post} from "@/pages/PostsPage.vue";
import {useStore} from "vuex";

defineProps<{ show: boolean }>();
const emit = defineEmits(['update:show']);

const store = useStore();

const hideDialog = () => {
  emit('update:show', false);
};

const createPost = (_post: Post) => {
  const post = { ..._post, id: Date.now() };
  store.state.posts.posts.push(post);
  store.commit('posts/setPosts', store.state.posts.posts);

  emit('update:show', false);
};

provide('create', createPost);
</script>

<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog-content" @click.stop>
      <PostForm />
    </div>
  </div>
</template>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0, 0.5);
  position: fixed;
  display: flex;
}
.dialog-content {
  padding: 15px;
  margin: auto;
  background: white;
  border-radius: 10px;
  min-height: 50px;
  min-width: 300px;
}

</style>