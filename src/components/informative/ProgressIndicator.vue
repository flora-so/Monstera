<template>
  <div class="msr-progress-indicator" :infinite="infinite">
    <div class="msr-progress-indicator__bar"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "ProgressIndicator",
  props: {
    colour: {
      type: String,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    value: {
      type: Number,
      default: () => 0,
      validator: (value: Number) => value >= 0 && value <= 1
    },
    infinite: Boolean
  },
  computed: {
    _colour() {
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
    _width() {
      return `${window.innerWidth * this.value}px`;
    }
  },
});
</script>

<style scoped>
@keyframes linear-loader {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

.msr-progress-indicator {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 5px;
  overflow: hidden;

  background-color: v-bind(_backgroundColour);
  backdrop-filter: blur(5px);
}

.msr-progress-indicator .msr-progress-indicator__bar {
  height: 5px;
  border-radius: 5px;
  background-color: v-bind(_colour);
  box-shadow: 0px 5px 13px -5px v-bind(_colour);
}

.msr-progress-indicator[infinite="false"] .msr-progress-indicator__bar {
  width: v-bind(_width);
}

.msr-progress-indicator[infinite="true"] .msr-progress-indicator__bar {
  width: 21%;
  min-width: 233px;
  animation: linear-loader 1300ms ease-in-out infinite;
}
</style>