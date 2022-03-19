<template>
  <button class="msr-link-button">
    <h4>{{ label }}</h4>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinkButton",
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