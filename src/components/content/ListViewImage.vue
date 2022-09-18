<template>
  <div class="msr-list-view__image">
    <input :id="_id" ref="input" type="checkbox" :value="value" v-model="_value" @change="_change"
      :disabled="disabled" />
    <label :for="_id">
      <div class="msr-list-view__image__box" tabindex="0" @keydown="_handleInput">
        <svg class="msr-list-view__image__tick" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours } from "../../types";

export default defineComponent({
  name: "ListViewImage",
  props: {
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    src: {
      type: String,
      default: ""
    },
    value: String,
    disabled: Boolean,
    modelValue: {
      type: [Boolean, Array],
    },
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
      return `msr-list-view__image${Math.random().toString(16).slice(2)}`;
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
    _url() {
      return `url(${this.src})`;
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
  }
});
</script>

<style scoped>
.msr-list-view__image {
  display: flex;
}

.msr-list-view__image input {
  display: none;
}

.msr-list-view__image label {
  cursor: pointer;
}

.msr-list-view__image label .msr-list-view__image__box:focus,
.msr-list-view__image label:hover .msr-list-view__image__box {
  outline: none;
  box-shadow: 0px 0px 0px 3px v-bind(_backgroundColour);
}

.msr-list-view__image .msr-list-view__image__box {
  border-radius: 3px;
  transition: all ease-out 150ms;
}

.msr-list-view__image .msr-list-view__image__box .msr-list-view__image__tick {
  width: 55px;
  filter: invert(1);

  transition: all ease-out 150ms;
}

/* Checkbox States */
.msr-list-view__image input:not(:checked)+label .msr-list-view__image__box {
  background-image: v-bind(_url);
  background-color: v-bind(_colour);
}

.msr-list-view__image input:checked+label .msr-list-view__image__box {
  background-color: v-bind(_colour);
}

/* Tick States */
.msr-list-view__image input:checked+label .msr-list-view__image__box .msr-list-view__image__tick {
  transform: scale(0.65, 0.65);
}

.msr-list-view__image input:not(:checked)+label .msr-list-view__image__box .msr-list-view__image__tick {
  transform: scale(0, 0);
}
</style>