<template>
  <button class="msr-text-button">
    <slot name="leading"></slot>
    <h4>{{ label }}</h4>
  </button>
</template>

<script lang="ts">
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
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent', 'success', 'danger', 'warning']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _colour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.21)`;
      } else {
        return `${this.colour}36`;
      }
    },
    _shadowColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
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
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: bold;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-text-button:hover {
  background-color: v-bind(_backgroundColour);

  box-shadow: 0px 2px 13px v-bind(_shadowColour);
}
</style>