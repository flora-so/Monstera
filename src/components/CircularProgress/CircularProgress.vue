<template>
  <svg class="msr-circular-progress">
    <circle
      class="msr-circular-progress__spinner"
      :r="_spinnerRadius"
      :cx="_spinnerSize"
      :cy="_spinnerSize"
      pathLength="100"
    />
  </svg>
</template>

<script lang="ts">
import { Colours } from "../../types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CircularProgress",
  props: {
    colour: {
      type: String,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    size: {
      type: Number,
      default: () => 64,
    },
    thickness: {
      type: Number,
      default: () => 6,
    }
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
    _canvasSize() {
      return `${this.size}px`;
    },
    _thickness() {
      return `${this.thickness}px`;
    },
    _spinnerSize() {
      return this.size / 2;
    },
    _spinnerRadius() {
      return this._spinnerSize - (this.thickness / 2);
    },
  },
});
</script>

<style scoped>
@keyframes rotator {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.msr-circular-progress {
  width: v-bind(_canvasSize);
  height: v-bind(_canvasSize);
  animation: rotator 1300ms linear infinite;
}

@keyframes dash {
  0%,
  25% {
    stroke-dashoffset: 96;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: 26;
    transform: rotate(45deg);
  }
  100% {
    stroke-dashoffset: 96;
    transform: rotate(360deg);
  }
}

.msr-circular-progress .msr-circular-progress__spinner {
  stroke: v-bind(_colour);
  stroke-width: v-bind(_thickness);
  stroke-linecap: round;
  fill: none;
  stroke-dasharray: 100;

  transform-origin: center;
  animation: dash 1300ms ease-out infinite;
}
</style>