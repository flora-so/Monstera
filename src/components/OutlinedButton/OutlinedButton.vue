<template>
  <div class="msr-outlined-button__wrapper">
    <button class="msr-outlined-button" v-bind="$attrs" :disabled="disabled" :ignore="ignore">
      <slot name="leading" width="21px" height="21px" :colour="_colour" :tailwind="_tailwind"></slot>
      <h4 class="msr-outlined-button__label">{{ label }}</h4>
      <slot name="trailing" width="21px" height="21px" :colour="_colour" :tailwind="_tailwind"></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Colours } from "../../types";

export default defineComponent({
  name: "OutlinedButton",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String as PropType<Colours | string>,
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
      if (this.disabled) {
        return "grey";
      }

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
      if (this.disabled) {
        return `w-5 h-5 text-gray scale-125`;
      }

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
.msr-outlined-button__wrapper {
  display: flex
}

.msr-outlined-button {
  display: flex;
  align-items: center;
  column-gap: 5px;

  padding: 10px 20px;
  border: 1px solid v-bind(_colour);
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

.msr-outlined-button:hover {
  background-color: v-bind(_backgroundColour);
}

.msr-outlined-button:disabled {
  cursor: not-allowed;

  color: grey;
  background-color: #f1f1f1;
  border: 1px solid lightgrey;
}

.msr-outlined-button[ignore="true"] {
  pointer-events: none;
  opacity: 0.89;
}
</style>