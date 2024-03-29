<template>
  <div class="msr-small-button__wrapper">
    <button class="msr-small-button" v-bind="$attrs" :disabled="disabled" :ignore="ignore">
      <slot name="leading" width="21px" height="21px" :colour="colour" :tailwind="_tailwind"></slot>
      <h4 class="msr-small-button__label">{{ label }}</h4>
      <slot name="trailing" width="21px" height="21px" :colour="colour" :tailwind="_tailwind"></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { Colours } from "../../types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SmallButton",
  inheritAttrs: false,
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
  },
});
</script>

<style scoped>
.msr-small-button__wrapper {
  display: flex;
}

.msr-small-button {
  display: flex;
  align-items: center;
  column-gap: 5px;

  padding: 10px 20px;
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

.msr-small-button:hover {
  box-shadow: 0px 13px 21px -5px v-bind(_shadowColour);
}

.msr-small-button:disabled {
  cursor: not-allowed;

  color: grey;
  background-color: lightgrey;
  box-shadow: none;
}

.msr-small-button[ignore="true"] {
  pointer-events: none;
  box-shadow: none;
  opacity: 0.89;
}
</style>