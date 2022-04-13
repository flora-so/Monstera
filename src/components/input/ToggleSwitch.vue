<template>
  <div class="msr-toggle-switch">
    <input :id="_id" ref="input" type="checkbox" :checked="checked" v-model="_value" @change="_change" />
    <label :for="_id">
      <div class="msr-toggle-switch__background">
        <div class="msr-toggle-switch__toggle"></div>
      </div>

      <div class="msr-toggle-switch__label">{{ label }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "ToggleSwitch",
  inheritAttrs: false,
  props: {
    label: String,
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    modelValue: {
      type: [Boolean, Array],
    },
    multiselect: Boolean,
    checked: Boolean
  },
  emits: {
    change: (value: Boolean) => {
      return typeof value === "boolean"
    },
    "update:modelValue"(value: boolean | string[]) {
      return true;
    },
  },
  computed: {
    _id() {
      return `msr-chips${Math.random().toString(16).slice(2)}`;
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
    _value: {
      get() {
        return this.modelValue;
      },
      set(value: boolean | string[]) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    _change() {
      this.$emit('change', (this.$refs.input as HTMLInputElement).checked)
    }
  }
});
</script>

<style scoped>
.msr-toggle-switch input {
  display: none;
}

.msr-toggle-switch label {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.msr-toggle-switch .msr-toggle-switch__background {
  padding: 3px;
  background-color: #7f7f7f36;
  border-radius: 20px;
  margin-right: 13px;

  transition: all ease-out 300ms;
}

.msr-toggle-switch .msr-toggle-switch__toggle {
  width: 21px;
  height: 21px;
  border-radius: 21px;

  background-color: white;

  transition: all ease-out 150ms;
}

.msr-toggle-switch label:hover .msr-toggle-switch__background {
  background-color: v-bind(_hoverColour);
}

.msr-toggle-switch input:not(:checked)+label .msr-toggle-switch__background .msr-toggle-switch__toggle {
  margin-right: 21px;
}

.msr-toggle-switch input:checked+label .msr-toggle-switch__background .msr-toggle-switch__toggle {
  margin-left: 21px;
}

.msr-toggle-switch input:checked+label .msr-toggle-switch__background {
  color: white;
  background-color: v-bind(_colour);
}
</style>