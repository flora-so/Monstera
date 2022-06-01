<template>
  <button class="msr-big-button" :disabled="disabled" :ignore="ignore">
    <slot name="leading" width="20px" height="20px" :colour="colour" :tailwind="_tailwind"></slot>
    <h4 class="msr-big-button__label">{{ label }}</h4>
    <slot name="trailing" width="20px" height="20px" :colour="colour" :tailwind="_tailwind"></slot>
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
    },
    ignore: Boolean,
    disabled: Boolean,
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
    _tailwind() {
      if (this.colour == "#ffffff") {
        return `w-5 h-5 text-white scale-125`;
      } else {
        return `w-5 h-5 text-[${this.colour}] scale-125`;
      }
    }
  }
});
</script>

<style scoped>
.msr-big-button {
  width: 100%;
  max-width: 377px;
  column-gap: 5px;

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

.msr-big-button:disabled {
  cursor: not-allowed;

  color: grey;
  background-color: lightgrey;
  box-shadow: none;
}

.msr-big-button[ignore="true"] {
  pointer-events: none;
  box-shadow: none;
  opacity: 0.89;
}
</style>