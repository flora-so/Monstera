<template>
  <div class="msr-snackbar">
    <h4>{{ message }}</h4>

    <div class="msr-snackbar__action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Snackbar",
  props: {
    message: {
      type: String,
      required: true,
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
  }
});
</script>

<style scoped>
.msr-snackbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 8px;
  padding: 8px 8px 8px 16px;
  width: 100%;
  max-width: 377px;
  margin: 13px auto;

  color: v-bind(colour);
  font-size: 1.125rem;
  line-height: 1.5rem;

  background-color: v-bind(_backgroundColour);
  box-shadow: 0px 2px 13px v-bind(_shadowColour);
}

@media (min-width: 768px) {
  .msr-snackbar {
    top: 0;
    bottom: unset;
    left: unset;
    margin: 13px;
  }
}

.msr-snackbar .msr-snackbar__action {
  min-height: 34px;
  min-width: 34px;
}
</style>