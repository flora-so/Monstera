<template>
  <div class="msr-floating-card" :tight-fit="tightFit">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "FloatingCard",
  props: {
    hover: Boolean,
    colour: {
      type: String as PropType<Colours | string>,
      default: () => "unset",
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$").test(value)
    },
    tightFit: Boolean,
  },
  computed: {
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
  },
});
</script>

<style scoped>
.msr-floating-card {
  border-radius: 8px;
  box-shadow: 0px 5px 13px #7d7d7d36;
  background-color: v-bind(_colour);
}

.msr-floating-card[tight-fit="false"] {
  padding: 21px;
}

.msr-floating-card[tight-fit="true"] {
  padding: 8px;
}
</style>