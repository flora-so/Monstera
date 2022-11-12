<template>
  <div class="msr-radio-button">
    <input :id="_id" ref="input" :name="group" :value="label" type="radio" v-model="value" @change="_change" />
    <label :for="_id">
      <div class="msr-radio-button__background">
        <div class="msr-radio-button__toggle"></div>
      </div>

      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "RadioButton",
  props: {
    label: {
      type: String,
      required: true
    },
    group: {
      type: String,
      default: "radio"
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    modelValue: {
      type: [String, Array],
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
      return `msr-radio-button${Math.random().toString(16).slice(2)}`;
    },
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | string[]) {
        this.$emit("update:modelValue", value)
      }
    },
  },
  methods: {
    _change() {
      this.$emit('change', (this.$refs.input as HTMLInputElement).checked);
    }
  }
});
</script>

<style scoped>
.msr-radio-button {
  padding: 10px 0px;
}

.msr-radio-button input {
  display: none;
}

.msr-radio-button label {
  display: flex;
  align-items: center;

  user-select: none;
  cursor: pointer;

  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.msr-radio-button label .msr-radio-button__background {
  border-radius: 13px;

  margin-right: 8px;
  transition: all ease-out 150ms;
}

.msr-radio-button label .msr-radio-button__toggle {
  transition: all ease-out 150ms;
}

.msr-radio-button label:hover .msr-radio-button__background {
  box-shadow: 0px 0px 0px 3px v-bind(_backgroundColour);
}

.msr-radio-button input:not(:checked)+label .msr-radio-button__background {
  padding: 9px;
  border: 1px solid #7f7f7f36;
}

.msr-radio-button input:checked+label .msr-radio-button__background {
  padding: 4px;
  border: 1px solid v-bind(_colour);

  background-color: v-bind(_colour);
}

.msr-radio-button input:checked+label .msr-radio-button__background .msr-radio-button__toggle {
  padding: 5px;
  border-radius: 5px;

  background-color: white;
}
</style>