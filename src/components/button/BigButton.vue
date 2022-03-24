<template>
  <button class="msr-link-button">
    <slot name="leading"></slot>
    <h4>{{ label }}</h4>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent', 'success', 'danger', 'warning']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _backgroundColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.backgroundColour)) {
        return `rgb(var(--${this.backgroundColour}))`;
      } else {
        return this.backgroundColour;
      }
    },
    _shadowColour() {
      if (['primary', 'accent', 'success', 'danger', 'warning']
        .includes(this.backgroundColour)) {
        return `rgba(var(--${this.backgroundColour}), 0.34)`;
      } else {
        return `${this.backgroundColour}57`;
      }
    },
  },
});
</script>

<style scoped>
.msr-link-button {
  width: 100%;
  max-width: 377px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px 20px;
  border-radius: 8px;
  background-color: v-bind(_backgroundColour);

  user-select: none;
  color: v-bind(colour);
  font-size: 1.313rem;
  line-height: 1.75rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-link-button:hover {
  box-shadow: 0px 2px 13px v-bind(_shadowColour);
}
</style>