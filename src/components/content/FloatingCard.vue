<template>
  <div class="msr-floating-card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FloatingCard"
});
</script>

<style scoped>
.msr-floating-card {
  border-radius: 8px;
  box-shadow: 0px 5px 13px #7d7d7d36;
  padding: 8px;
}
</style>