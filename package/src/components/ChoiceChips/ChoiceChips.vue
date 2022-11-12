<template>
  <div class="msr-choice-chips">
    <input v-if="multiselect" :id="_id" ref="input" :name="group" :value="label" type="checkbox" v-model="value"
      @change="_change" />
    <input :id="_id" ref="input" :name="group" :value="label" type="radio" v-model="value" @change="_change" />
    <label :for="_id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "ChoiceChips",
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
      type: [String, Array] as PropType<string[] | boolean>,
    },
    multiselect: Boolean
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
.msr-choice-chips {
  padding: 10px 0px;
}

.msr-choice-chips input {
  display: none;
}

.msr-choice-chips label {
  user-select: none;
  cursor: pointer;

  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;

  padding: 10px 20px;
  background-color: #7f7f7f1a;
  border-radius: 20px;

  transition: all ease-out 150ms;
}

.msr-choice-chips label:hover {
  background-color: v-bind(_hoverColour);
}

.msr-choice-chips input:checked+label {
  color: white;
  background-color: v-bind(_colour);
  box-shadow: 0px 5px 13px -5px v-bind(_colour);
}
</style>