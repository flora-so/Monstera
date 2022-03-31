<template>
  <button class="msr-big-button">
    <slot name="leading"></slot>
    <h4 class="msr-big-button__label">{{ label }}</h4>
    <slot name="trailing"></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "BigButton",
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String,
      default: () => "#ffffff",
      validator: (value: string) => new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    backgroundColour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.backgroundColour)) {
        return `rgb(var(--${this.backgroundColour}))`;
      } else {
        return this.backgroundColour;
      }
    },
    _shadowColour() {
      if (Object.keys(Colours).includes(this.backgroundColour)) {
        return `rgba(var(--${this.backgroundColour}), 0.34)`;
      } else {
        return `${this.backgroundColour}57`;
      }
    },
  }
});
</script>

<style scoped>
.msr-big-button {
  width: 100%;
  max-width: 377px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px 20px;
  border-radius: 8px;
  background-color: v-bind(_backgroundColour);
  box-shadow: 0px 5px 13px -5px v-bind(_backgroundColour);

  user-select: none;
  color: v-bind(colour);
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-big-button:hover {
  box-shadow: 0px 13px 21px -5px v-bind(_shadowColour);
}
</style>