<script setup lang="ts">
/* Imports */
import { ref, type Ref } from "vue";

import { FileInputValidator } from "../../types";



/* Props */
const props = defineProps<{
  validator?: FileInputValidator,
  accept?: string,
  multiple?: boolean,
}>();



/* Emits */
const emit = defineEmits<{
  (e: "change", files: File[]): void,
}>();



/* States */
const input: Ref<HTMLInputElement | null> = ref(null);



/* Methods */
const _openPicker = () => {
  input.value?.click();
}

const _handleChange = (e: Event) => {
  const inputFiles = Array.from((e.target as HTMLInputElement).files!);

  const validated: File[] = [];

  inputFiles.forEach(file => !(props.validator?.(file) ?? "") ? validated.push(file) : null);

  if (validated.length > 0) {
    emit("change", validated);
  }
}
</script>

<template>
  <div class="msr-file-input-wrapper" @click="_openPicker">
    <slot></slot>
    <input ref="input" class="msr-file-input-wrapper__input" type="file" :accept="accept" :multiple="multiple"
      @change="_handleChange">
  </div>
</template>

<style scoped>
.msr-file-input-wrapper .msr-file-input-wrapper__input {
  display: none;
}
</style>