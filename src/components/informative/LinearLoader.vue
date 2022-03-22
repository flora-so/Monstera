<template>
  <div>
    <div class="msr-linear-loader">
      <div class="msr-linear-loader__bar"></div>
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
@keyframes linear-loader {
  0% {
    transform: translateX(-100%);
  }
  25% {
    transform: translateX(20vw);
  }
  50% {
    transform: translateX(50vw);
  }
  75% {
    transform: translateX(75vw);
  }
  100% {
    transform: translateX(100vw);
  }
}

.msr-linear-loader {
  width: 100vw;
  height: 5px;
  overflow: hidden;

  background-color: v-bind(_backgroundColour);
}

.msr-linear-loader .msr-linear-loader__bar {
  width: 21%;
  height: 5px;
  background-color: v-bind(_colour);

  animation: linear-loader 2s linear infinite;
}
</style>