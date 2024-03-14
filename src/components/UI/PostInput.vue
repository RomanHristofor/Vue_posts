<script lang="ts">

export default {
  name: 'post-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event: any) {
      (this as any).$emit('update:modelValue', event.target.value)
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