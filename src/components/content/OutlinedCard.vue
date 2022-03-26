<template>
  <div class="msr-outlined-card" :hover="hover">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OutlinedCard",
  props: {
    hover: Boolean
  }
});
</script>

<style scoped>
.msr-outlined-card {
  border-radius: 8px;
  border: 1px solid #7f7f7f36;
  padding: 8px;

  transition: all ease-out 300ms;
}

.msr-outlined-card[hover="true"]:hover {
  border: 1px solid transparent;
  box-shadow: 0px 5px 13px #7d7d7d36;
}
</style>