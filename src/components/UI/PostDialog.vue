<script lang="ts">
import togglePopup from "@/mixins/togglePopup";

export default {
  name: 'post-dialog',
  mixins: [togglePopup],
}
</script>

<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="dialog-content" @click.stop>
      <slot></slot>
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