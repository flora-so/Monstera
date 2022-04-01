<template>
  <div class="msr-outlined-card" :hover="hover" :tight-fit="tightFit">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "OutlinedCard",
  props: {
    hover: Boolean,
    borderColour: {
      type: String as PropType<Colours | string>,
      default: () => "#7f7f7f36",
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => "unset",
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    tightFit: Boolean,
  },
  computed: {
    _borderColour() {
      if (Object.keys(Colours).includes(this.borderColour)) {
        return `rgb(var(--${this.borderColour}))`;
      } else {
        return this.borderColour;
      }
    },
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
  }
});
</script>

<style scoped>
.msr-outlined-card {
  border-radius: 8px;
  border: 1px solid v-bind(_borderColour);
  background-color: v-bind(_colour);

  transition: all ease-out 300ms;
}

.msr-outlined-card[tight-fit="false"] {
  padding: 21px;
}

.msr-outlined-card[tight-fit="true"] {
  padding: 8px;
}

.msr-outlined-card[hover="true"]:hover {
  border: 1px solid transparent;
  box-shadow: 0px 5px 13px #7d7d7d36;
}
</style>