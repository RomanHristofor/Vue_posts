<script lang="ts">

export default {
  name: 'post-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: Event) {
      (this as any).$emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
}
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