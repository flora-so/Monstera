<script setup lang="ts">
/* Imports */
import { ref, type Ref } from "vue";

import { FileInputValidator } from "../../types";



/* Props */
const props = defineProps<{
  validator?: FileInputValidator,
  min?: string,
  max?: string,
}>();



/* Emits */
const emit = defineEmits<{
  (e: "change", date: string): void,
}>();



/* States */
const input: Ref<HTMLInputElement | null> = ref(null);



/* Methods */
const _openPicker = () => {
  input.value?.showPicker();
}

const setDate = (e: Event) => {
  const inputDate = (e.target as HTMLInputElement).value;

  emit("change", inputDate);
}
</script>

<template>
  <div class="msr-date-input-wrapper" @click="_openPicker">
    <slot></slot>
    <input ref="input" class="msr-date-input-wrapper__input" type="date" :min="min" :max="max" @change="setDate">
  </div>
</template>

<style scoped>
.msr-date-input-wrapper {
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
}

.msr-date-input-wrapper .msr-date-input-wrapper__input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  box-sizing: border-box;
}
</style>