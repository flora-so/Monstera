<template>
  <button class="msr-outlined-button">
    <slot name="leading"></slot>
    <h4 class="msr-outlined-button__label">{{ label }}</h4>
    <slot name="trailing"></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Colors } from "../../types";

export default defineComponent({
  name: "OutlinedButton",
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String as PropType<Colors | string>,
      default: () => Colors.primary,
      validator: (value: string) =>
        Object.keys(Colors).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _colour() {
      if (Object.keys(Colors).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (Object.keys(Colors).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.21)`;
      } else {
        return `${this.colour}36`;
      }
    }
  },
});
</script>

<style scoped>
.msr-outlined-button {
  display: flex;
  align-items: center;

  padding: 10px 20px;
  border: 1px solid v-bind(_colour);
  border-radius: 8px;
  background-color: transparent;

  user-select: none;
  color: v-bind(_colour);
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-outlined-button:hover {
  background-color: v-bind(_backgroundColour);
}
</style>