<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'post-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: Event) {
      console.log('updateInput', (event.target as HTMLInputElement).value);
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
})
</script>

<template>
  <input class="input" type="text" :value="modelValue" @input="updateInput">
</template>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>