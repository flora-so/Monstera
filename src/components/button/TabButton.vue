<template>
  <div class="msr-tab-button pt-2 bg-primary-light rounded-t-lg">
    <input :id="_id" ref="input" :name="group" :type="radio" v-model="value"
      @change="_change" />
    <label :for="_id">
      <span class="msr-tab-button__label text-lg font-bold px-6 text-primary">
        {{ label }}
      </span>
      <div class="msr-tab-button__indicator mt-1 pt-1 bg-primary rounded-t"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: 'TabButton',
  props: {
    label: {
      type: String,
      required: true
    },
    group: {
      type: String,
      default: "chips"
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    modelValue: {
      type: String,
    },
  },
  emits: {
    change: (value: boolean) => {
      return typeof value === "boolean"
    },
    "update:modelValue": (value: string | string[]) => {
      return true
    }
  },
  computed: {
    _id() {
      return `msr-choice-chips${Math.random().toString(16).slice(2)}`;
    },
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _hoverColour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
  }
});
</script>

<style scoped>
.msr-tab-button {
  padding-top: 8px;
  background-color: v-bind(_colour);
}
</style>