<template>
  <form class="msr-form" @submit.prevent="() => action" novalidate>
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MonsteraForm",
  props: {
    action: {
      type: Function,
      required: true
    }
  },
});
</script>