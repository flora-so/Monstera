<template>
  <div class="msr-animated-text-field" :error="_error">
    <div class="msr-animated-text-field__input">
      <input
        :id="_id"
        :type="type"
        ref="input"
        placeholder=" "
        :disabled="disabled"
        :value="modelValue == undefined ? value : modelValue"
        @input="$emit('update:modelValue', ($refs.input as HTMLInputElement).value)"
        @blur="validate"
      />
      <label :for="_id">{{ label }}</label>
    </div>
    <p class="msr-animated-text-field__message">{{ _message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, TextFieldType, type TextFieldContext, type TextFieldValidator } from "../../types";

export default defineComponent({
  name: "AnimatedTextField",
  props: {
    label: {
      type: String,
      required: true
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) =>
        [Colours.primary as string, Colours.accent as string].includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    type: {
      type: String as PropType<TextFieldType>,
      default: () => TextFieldType.text
    },
    validator: {
      type: Function as PropType<TextFieldValidator>
    },
    modelValue: {
      type: String,
      default: () => undefined
    },
    value: String,
    disabled: Boolean,
    helperText: String,
  },
  data() {
    return {
      _message: "",
      _error: false,
    }
  },
  emits: {
    "update:modelValue"(value: string) {
      return typeof value == "string";
    },
    blur(value: string) {
      return typeof value === "string";
    },
    context(ctx: TextFieldContext) {
      return ctx;
    }
  },
  computed: {
    _id() {
      return `msr-animated-text-field${Math.random().toString(16).slice(2)}`;
    },
    _colour() {
      if ([Colours.primary as string, Colours.accent as string].includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if ([Colours.primary as string, Colours.accent as string].includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.13)`;
      } else {
        return `${this.colour}21`;
      }
    },
  },
  methods: {
    _value() {
      return (this.$refs.input as HTMLInputElement).value;
    },
    validate() {
      if (this.validator) {
        let message = this.validator(this._value());

        this.setError(message);
      }

      this.$emit("blur", this._value());
    },
    setError(message: string) {
      if (message.length == 0) {
        this._error = false;
        this._message = this.helperText ?? "";
      } else {
        this._error = true;
        this._message = message;
      }
    }
  },
  mounted() {
    let ctx: TextFieldContext = {
      value: this._value,
      validate: this.validate,
      setError: this.setError,
    }

    this._message = this.helperText ?? "";
    this.$emit("context", ctx);
  }
});
</script>

<style scoped>
.msr-animated-text-field {
  cursor: text;
}

.msr-animated-text-field .msr-animated-text-field__input {
  display: flex;
}

.msr-animated-text-field input {
  padding: 18px 13px 8px 13px;
  font-size: 1.125rem;
  line-height: 1.5rem;

  outline: none;
  border: none;
  border-radius: 8px;
  background-color: #7f7f7f1a;
  transition: all ease-out 300ms;
}

.msr-animated-text-field label {
  display: flex;
  position: absolute;
  user-select: none;

  cursor: text;
  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;
  transform: translate(13px, 15px);

  transition: all ease-out 100ms;
}

/* Input Focus */
.msr-animated-text-field input:focus + label,
.msr-animated-text-field input:not(:placeholder-shown) + label {
  font-size: 0.625rem;
  line-height: 0.813rem;
  font-weight: normal;

  transform: translate(13px, 5px);
}

.msr-animated-text-field input:focus {
  background-color: v-bind(_backgroundColour);
}

.msr-animated-text-field input:focus + label {
  color: v-bind(_colour);
}

/* Message */
.msr-animated-text-field .msr-animated-text-field__message {
  user-select: none;
  cursor: default;

  margin-top: 2px;
  margin-left: 13px;
  margin-bottom: 0.9rem;

  color: #585858;
  font-size: 0.625rem;
  line-height: 0.813rem;
  transform: translate(0px, -0.85rem);

  transition: transform ease-out 100ms;
}

.msr-animated-text-field .msr-animated-text-field__message:not(:empty) {
  transform: translate(0px, 0px);
  margin-bottom: 0rem;
  z-index: 0;
}

/* Error */
.msr-animated-text-field[error="true"] input {
  background-color: #ff595921;
}

.msr-animated-text-field[error="true"] label,
.msr-animated-text-field[error="true"] .msr-animated-text-field__message {
  color: #ff5959 !important;
}
</style>