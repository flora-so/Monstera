<template>
  <button class="msr-icon-button" :filled="filled">
    <slot name="icon" width="21px" height="21px" :colour="_colour"></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Colours } from "../../types";

export default defineComponent({
  name: "IconButton",
  props: {
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    filled: Boolean
  },
  computed: {
    _colour() {
      if (this.filled) {
        return "#ffffff";
      } else {
        if (Object.keys(Colours).includes(this.colour)) {
          return `rgb(var(--${this.colour}))`;
        } else {
          return this.colour;
        }
      }
    },
    _backgroundColour() {
      if (this.filled) {
        if (Object.keys(Colours).includes(this.colour)) {
          return `rgb(var(--${this.colour}))`;
        } else {
          return this.colour;
        }
      } else {
        if (Object.keys(Colours).includes(this.colour)) {
          return `rgba(var(--${this.colour}), 0.21)`;
        } else {
          return `${this.colour}36`;
        }
      }
    },
    _shadowColour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
  },
});
</script>

<style scoped>
.msr-icon-button {
  display: flex;
  align-items: center;

  padding: 10px;
  border-radius: 8px;

  user-select: none;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  white-space: nowrap;

  transition: all ease-out 300ms;
}

.msr-icon-button[filled="true"] {
  background-color: v-bind(_backgroundColour);
  box-shadow: 0px 5px 13px -5px v-bind(_backgroundColour);
}

.msr-icon-button[filled="false"]:hover {
  background-color: v-bind(_backgroundColour);
}

.msr-icon-button[filled="true"]:hover {
  box-shadow: 0px 13px 21px -5px v-bind(_shadowColour);
}
</style>