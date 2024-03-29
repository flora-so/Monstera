<template>
  <div class="msr-link-button__wrapper">
    <a class="msr-link-button" v-bind="$attrs" :disabled="disabled" :ignore="ignore" :href="href">
      <h4 class="msr-link-button__label">{{ label }}</h4>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Colours } from "../../types";

export default defineComponent({
  name: "LinkButton",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    href: String,
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
  },
});
</script>

<style scoped>
.msr-link-button__wrapper {
  display: flex
}

.msr-link-button {
  cursor: pointer;

  background-color: transparent;

  color: v-bind(_colour);
  font-size: 1rem;
  line-height: 1.25rem;
}

.msr-link-button .msr-link-button__label {
  border-bottom: 0.5px solid transparent;

  transition: border ease-out 300ms;
}

.msr-link-button .msr-link-button__label:hover {
  border-bottom: 0.21px solid v-bind(_colour);
}

.msr-link-button:disabled {
  pointer-events: none;
  cursor: not-allowed;

  color: grey;
  border: none;
}

.msr-link-button[ignore="true"] {
  pointer-events: none;
  opacity: 0.89;
}
</style>