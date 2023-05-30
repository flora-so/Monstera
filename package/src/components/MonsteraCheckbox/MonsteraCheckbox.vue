<template>
  <div class="msr-checkbox">
    <input :id="_id" ref="input" :value="value" type="checkbox" :intermediate="intermediate" v-model="_value"
      @change="_change" />
    <label :for="_id">
      <div class="msr-checkbox__box" tabindex="0" @keydown="_handleInput">
        <svg class="msr-checkbox__tick" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>

        <svg class="msr-checkbox__intermediate" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "MonsteraCheckbox",
  props: {
    label: {
      type: String,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    size: {
      type: Number,
      default: () => 18,
    },
    value: String,
    modelValue: {
      type: [Boolean, Array],
    },
    checked: Boolean,
    intermediate: Boolean
  },
  emits: {
    change(value: boolean) {
      return typeof value == "boolean";
    },
    "update:modelValue"(value: boolean | string[]) {
      return true;
    },
  },
  computed: {
    _id() {
      return `msr-animated-text-field${Math.random().toString(16).slice(2)}`;
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
    _size() {
      return `${this.size}px`;
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
    _handleInput(e: KeyboardEvent) {
      if (e.key == "Enter") {
        (this.$refs.input as HTMLInputElement).click();
      }
    },
    _change() {
      this.$emit('change', (this.$refs.input as HTMLInputElement).checked);
    }
  },
  mounted() {
    if (this.checked === true) {
      this._value = true;
    }
  }
});
</script>

<style scoped>
.msr-checkbox {
  display: flex;
}

.msr-checkbox input {
  display: none;
}

.msr-checkbox label {
  cursor: pointer;
}

.msr-checkbox label .msr-checkbox__box:focus,
.msr-checkbox label:hover .msr-checkbox__box {
  outline: none;
  box-shadow: 0px 0px 0px 3px v-bind(_backgroundColour);
}

.msr-checkbox .msr-checkbox__box {
  border-radius: 3px;
  transition: all ease-out 150ms;
}

.msr-checkbox .msr-checkbox__box .msr-checkbox__tick,
.msr-checkbox .msr-checkbox__box .msr-checkbox__intermediate {
  width: v-bind(_size);
  filter: invert(1);

  transition: all ease-out 150ms;
}

/* Checkbox States */
.msr-checkbox input:not(:checked)+label .msr-checkbox__box {
  border: 1px solid #7f7f7f36;
  background-color: transparent;
}

.msr-checkbox input:checked+label .msr-checkbox__box,
.msr-checkbox input[intermediate="true"]+label .msr-checkbox__box {
  border: 1px solid transparent;
  background-color: v-bind(_colour);
}

/* Tick States */
.msr-checkbox input:checked+label .msr-checkbox__box .msr-checkbox__tick {
  transform: scale(1, 1);
}

.msr-checkbox input:not(:checked)[intermediate="true"]+label .msr-checkbox__box .msr-checkbox__tick {
  display: none;
}

.msr-checkbox input:not(:checked)+label .msr-checkbox__box .msr-checkbox__tick {
  transform: scale(0, 0);
}

/* Intermediate State */
.msr-checkbox input[intermediate="false"]+label .msr-checkbox__box .msr-checkbox__intermediate,
.msr-checkbox input:checked[intermediate="true"]+label .msr-checkbox__box .msr-checkbox__intermediate {
  display: none;
}

.msr-checkbox input:not(:checked)[intermediate="true"]+label .msr-checkbox__box .msr-checkbox__intermediate {
  transform: scale(1, 1);
}
</style>