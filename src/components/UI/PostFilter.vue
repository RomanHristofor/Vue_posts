<script lang="ts">

export default {
  name: 'post-filter',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event: Event) {
      (this as any).$emit('update:modelValue', (event.target as HTMLInputElement).value);
    }
  }
}
</script>

<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Select from list</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<style scoped>

</style>