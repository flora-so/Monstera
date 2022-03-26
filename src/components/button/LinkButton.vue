<template>
  <button class="msr-link-button">
    <h4 class="msr-link-button__label">{{ label }}</h4>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Colors } from "../../types";

export default defineComponent({
  name: "LinkButton",
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String as PropType<Colors | string>,
      default: () => Colors.primary,
      validator: (value: Colors | string) =>
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
  },
});
</script>

<style scoped>
.msr-link-button {
  margin: 0px 5px;
  background-color: transparent;
  border-bottom: 0.5px solid transparent;

  color: v-bind(_colour);
  font-size: 1.125rem;
  line-height: 1.5rem;

  transition: all ease-out 300ms;
}

.msr-link-button:hover {
  border-bottom: 0.21px solid v-bind(_colour);
}
</style>