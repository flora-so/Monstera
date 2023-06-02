<template>
  <span class="msr-badge" :rounded="rounded">
    <slot name="leading"></slot>
    {{ label }}
    <slot name="trailing"></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "MonsteraBadge",
  props: {
    label: {
      type: String,
      required: true,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$").test(value)
    },
    rounded: Boolean
  },
  computed: {
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.21)`;
      } else {
        return `${this.colour}36`;
      }
    },
  },
});
</script>

<style scoped>
.msr-badge {
  color: v-bind(_colour);
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
  background-color: v-bind(_backgroundColour);

  border-radius: 5px;
  padding: 3px 8px;
}

.msr-badge[rounded="true"] {
  border-radius: 99px;
}
</style>