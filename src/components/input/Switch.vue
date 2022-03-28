<template>
  <div class="msr-switch">
    <input
      :id="_id"
      ref="input"
      type="checkbox"
      @change="$emit('change', ($refs.input as HTMLInputElement).checked)"
      :checked="checked"
      v-model="_value"
    />
    <label :for="_id">
      <div class="msr-switch__background">
        <div class="msr-switch__toggle"></div>
      </div>

      <div class="msr-switch__label">{{ label }}</div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "Switch",
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
  }
});
</script>

<style scoped>
.msr-switch input {
  display: none;
}

.msr-switch label {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
}

.msr-switch .msr-switch__background {
  padding: 3px;
  background-color: #7f7f7f36;
  border-radius: 20px;
  margin-right: 13px;

  transition: all ease-out 300ms;
}

.msr-switch .msr-switch__toggle {
  width: 21px;
  height: 21px;
  border-radius: 21px;

  background-color: white;

  transition: all ease-out 150ms;
}

.msr-switch label:hover .msr-switch__background {
  background-color: v-bind(_hoverColour);
}

.msr-switch
  input:not(:checked)
  + label
  .msr-switch__background
  .msr-switch__toggle {
  margin-right: 21px;
}

.msr-switch input:checked + label .msr-switch__background .msr-switch__toggle {
  margin-left: 21px;
}

.msr-switch input:checked + label .msr-switch__background {
  color: white;
  background-color: v-bind(_colour);
}
</style>