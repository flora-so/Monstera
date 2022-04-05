<template>
  <button class="msr-text-button" :disabled="disabled" :ignore="ignore">
    <slot name="leading" width="21px" height="21px" :colour="_colour" :tailwind="_tailwind"></slot>
    <h4 class="msr-text-button__label">{{ label }}</h4>
    <slot name="trailing" width="21px" height="21px" :colour="_colour" :tailwind="_tailwind"></slot>
  </button>
</template>

<script lang="ts">
import { Colours } from "../../types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextButton",
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    ignore: Boolean,
    disabled: Boolean,
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
    _tailwind() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `w-5 h-5 text-${this.colour} scale-125`;
      } else {
        return `w-5 h-5 text-[${this.colour}] scale-125`;
      }
    }
  },
});
</script>

<style scoped>
.msr-text-button {
  display: flex;
  align-items: center;

  padding: 10px 20px;
  border-radius: 8px;
  background-color: transparent;

  user-select: none;
  color: v-bind(_colour);
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-text-button:hover {
  background-color: v-bind(_backgroundColour);
}

.msr-text-button:disabled {
  cursor: not-allowed;

  color: grey;
  background-color: #f1f1f1;
}

.msr-text-button[ignore="true"] {
  pointer-events: none;
  opacity: 0.89;
}
</style>