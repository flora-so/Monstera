<template>
  <div class="msr-tab-button__wrapper">
    <div class="msr-tab-button">
      <input :id="_id" ref="input" :name="group" type="radio" v-model="value" @change="_change" />
      <label :for="_id">
        <div class="msr-tab-button__view">
          <span class="msr-tab-button__label">
            {{ label }}
          </span>
          <div class="msr-tab-button__indicator"></div>
        </div>
      </label>
    </div>
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
      default: "tabs"
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
      return `msr-tab-button${Math.random().toString(16).slice(2)}`;
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
    }
  },
  methods: {
    _change() {
      this.$emit('change', (this.$refs.input as HTMLInputElement).checked);
    }
  }
});
</script>

<style scoped>
.msr-tab-button__wrapper {
  display: flex;
}


.msr-tab-button input {
  display: none;
}

.msr-tab-button input ~ label .msr-tab-button__view {
  padding-top: 8px;
  border-radius: 8px 8px 0px 0px;

  cursor: pointer;

  transition: all 300ms ease-in-out;
}

.msr-tab-button input:checked ~ label .msr-tab-button__view,
.msr-tab-button input ~ label .msr-tab-button__view:hover {
  background-color: v-bind(_backgroundColour);
}

.msr-tab-button .msr-tab-button__label {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;

  padding: 0px 24px;
}

.msr-tab-button input:checked~label .msr-tab-button__label,
.msr-tab-button input ~ label .msr-tab-button__view:hover .msr-tab-button__label {
  color: v-bind(_colour);
}

.msr-tab-button input~label .msr-tab-button__indicator {
  margin-top: 4px;
  padding-top: 4px;
  border-radius: 4px 4px 0px 0px;

  background-color: v-bind(_colour);
  transition: all 150ms ease-in-out;
}

.msr-tab-button input:not(:checked)~label .msr-tab-button__indicator {
  transform: scale(0);
}

.msr-tab-button input:checked~label .msr-tab-button__indicator {
  transform: scale(1);
}
</style>