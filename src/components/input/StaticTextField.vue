<template>
  <div @click="forceFocus" class="msr-static-text-field" :error="_error" :disabled="disabled">
    <div class="msr-static-text-field__input">
      <div class="msr-static-text-field__label">
        <label :for="_id">{{ label }}</label>
      </div>
      <div class="msr-static-text-field__wrapper" :f="_focus">
        <div class="msr-static-text-field__icon">
          <slot name="leading" width="20px" height="20px" colour="#585858" :tailwind="_tailwind"></slot>
        </div>
        <input :id="_id" :type="type" ref="input" placeholder=" " :disabled="disabled" v-model="_modelValue"
          @input="_input" @focus="_focus = true" @blur="validate" />
        <div class="msr-static-text-field__icon">
          <slot name="trailing" width="20px" height="20px" colour="#585858" :tailwind="_tailwind"></slot>
        </div>
      </div>
    </div>
    <p class="msr-static-text-field__message">{{ _message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, TextFieldType, type TextFieldContext, type TextFieldValidator } from "../../types";

export default defineComponent({
  name: "StaticTextField",
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
      _value: "",
      _message: "",
      _error: false,
      _focus: false,
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
    _modelValue: {
      get() {
        return this.modelValue ?? this._value;
      },
      set(value: boolean | string[]) {
        this.$emit("update:modelValue", value);
      }
    },
    _tailwind() {
      return `w-5 h-5 text-[#585858] scale-125`;
    }
  },
  methods: {
    _input(e: Event) {
      this._value = (e.target as HTMLInputElement).value;
    },
    forceFocus() {
      (this.$refs.input as HTMLInputElement).focus();
    },
    getValue() {
      return this._modelValue;
    },
    validate() {
      this._focus = false;

      if (this.validator) {
        let message = this.validator(this._modelValue);

        this.setError(message);
      }

      this.$emit("blur", this._modelValue);
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
      value: this.getValue,
      focus: this.forceFocus,
      validate: this.validate,
      setError: this.setError,
    }

    this._message = this.helperText ?? "";
    this.$emit("context", ctx);

    if (!this.modelValue && this.value) {
      this._value = this.value;
    }
  }
});
</script>

<style scoped>
.msr-static-text-field[disabled="false"] {
  cursor: text;
}

.msr-static-text-field .msr-static-text-field__wrapper {
  display: flex;
  align-items: center;

  padding: 13px;
  border-radius: 8px;
  background-color: #7f7f7f1a;
  transition: all ease-out 300ms;
}

.msr-static-text-field .msr-static-text-field__wrapper input {
  /* padding: 13px; */
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 100%;

  outline: none;
  border: none;
  background-color: transparent;
}

.msr-static-text-field__input .msr-static-text-field__label {
  margin-bottom: 5px;
}

.msr-static-text-field[disabled="false"] .msr-static-text-field__label label {
  user-select: none;

  cursor: text;
  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;

  transition: all ease-out 100ms;
}

.msr-static-text-field[disabled="false"] .msr-static-text-field__input:hover .msr-static-text-field__wrapper[f="false"] {
  background-color: #7f7f7f0d;
  box-shadow: 0px 0px 0px 4px v-bind(_backgroundColour);
}

/* Input Focus */
.msr-static-text-field .msr-static-text-field__wrapper[f="true"] {
  background-color: v-bind(_backgroundColour);
}

/* Message */
.msr-static-text-field .msr-static-text-field__message {
  user-select: none;
  cursor: default;

  margin-top: 2px;
  margin-left: 13px;
  margin-bottom: 0.938rem;

  color: #585858;
  font-size: 0.625rem;
  line-height: 0.813rem;
  transform: translate(0px, -1rem);

  transition: transform ease-out 100ms;
}

.msr-static-text-field .msr-static-text-field__message:not(:empty) {
  transform: translate(0px, 0px);
  margin-bottom: 0rem;
  z-index: 0;
}

/* Error */
.msr-static-text-field[error="true"] .msr-static-text-field__wrapper {
  background-color: #ff595921;
}

.msr-static-text-field[error="true"] label,
.msr-static-text-field[error="true"] .msr-static-text-field__message {
  color: #ff5959 !important;
}
</style>