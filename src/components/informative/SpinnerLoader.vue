<template>
  <div>
    <div class="msr-spinner-loader">
      <div class="msr-spinner-loader__circle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinearLoader",
  props: {
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
  },
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.msr-spinner-loader {
  width: 100vw;
  height: 5px;
  overflow: hidden;

  background-color: v-bind(_backgroundColour);
}

.msr-spinner-loader .msr-spinner-loader__bar {
  width: 21%;
  height: 5px;
  background-color: v-bind(_colour);

  animation: spinner-loader 2s linear infinite;
}
</style>