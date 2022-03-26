<template>
  <button class="msr-small-button">
    <slot name="leading"></slot>
    <h4 class="msr-small-button__label">{{ label }}</h4>
    <slot name="trailing"></slot>
  </button>
</template>

<script lang="ts">
import { Colors } from "../../types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SmallButton",
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
      default: () => Colors.primary,
      validator: (value: string) =>
        Object.keys(Colors).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _backgroundColour() {
      if (Object.keys(Colors).includes(this.backgroundColour)) {
        return `rgb(var(--${this.backgroundColour}))`;
      } else {
        return this.backgroundColour;
      }
    },
    _shadowColour() {
      if (Object.keys(Colors).includes(this.backgroundColour)) {
        return `rgba(var(--${this.backgroundColour}), 0.34)`;
      } else {
        return `${this.backgroundColour}57`;
      }
    },
  },
});
</script>

<style scoped>
.msr-small-button {
  display: flex;
  align-items: center;

  padding: 10px 20px;
  border-radius: 8px;
  background-color: v-bind(_backgroundColour);
  box-shadow: 0px 5px 13px -5px v-bind(_backgroundColour);

  user-select: none;
  color: v-bind(colour);
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-small-button:hover {
  box-shadow: 0px 13px 21px -5px v-bind(_shadowColour);
}
</style>