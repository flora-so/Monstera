<template>
  <div @click="forceFocus" class="msr-static-textarea" :error="_error" :disabled="disabled">
    <div class="msr-static-textarea__input">
      <div class="msr-static-textarea__label">
        <label :for="_id">{{ label }}</label>
      </div>
      <div class="msr-static-textarea__wrapper" :f="_focus">
        <textarea :id="_id" ref="input" placeholder=" " :disabled="disabled" :rows="lines" :resizable="resizable"
          v-model="_modelValue" @input="_input" @focus="_focus = true" @blur="validate"></textarea>
      </div>
    </div>
    <p class="msr-static-textarea__message">{{ _message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, type InputContext, type InputValidator } from "../../types";

export default defineComponent({
  name: "StaticTextareaField",
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
    validator: {
      type: Function as PropType<InputValidator>
    },
    lines: {
      type: Number,
      default: () => 3
    },
    modelValue: {
      type: String,
      default: () => undefined
    },
    value: String,
    disabled: Boolean,
    resizable: Boolean,
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
    context(ctx: InputContext) {
      return ctx;
    }
  },
  computed: {
    _id() {
      return `msr-static-textarea${Math.random().toString(16).slice(2)}`;
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
    let ctx: InputContext = {
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
.msr-static-textarea[disabled="false"] {
  cursor: text;
}

.msr-static-textarea .msr-static-textarea__wrapper {
  display: flex;
  align-items: center;

  border-radius: 8px;
  background-color: #7f7f7f1a;
  transition: all ease-out 300ms;
}

.msr-static-textarea textarea {
  padding: 13px;

  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 100%;

  outline: none;
  border: none;
  background-color: transparent;
}

.msr-static-textarea textarea[resizable="false"] {
  resize: none;
}

.msr-static-textarea__input .msr-static-textarea__label {
  margin-bottom: 5px;
}

.msr-static-textarea[disabled="false"] .msr-static-textarea__label label {
  user-select: none;

  cursor: text;
  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;

  transition: all ease-out 100ms;
}

.msr-static-textarea[disabled="false"] .msr-static-textarea__input:hover .msr-static-textarea__wrapper[f="false"] {
  background-color: #7f7f7f0d;
  box-shadow: 0px 0px 0px 4px v-bind(_backgroundColour);
}

/* Input Focus */
.msr-static-textarea .msr-static-textarea__wrapper[f="true"] {
  background-color: v-bind(_backgroundColour);
}

/* Message */
.msr-static-textarea .msr-static-textarea__message {
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

.msr-static-textarea .msr-static-textarea__message:not(:empty) {
  transform: translate(0px, 0px);
  margin-bottom: 0rem;
  z-index: 0;
}

/* Error */
.msr-static-textarea[error="true"] .msr-static-textarea__wrapper {
  background-color: #ff595921;
}

.msr-static-textarea[error="true"] label,
.msr-static-textarea[error="true"] .msr-static-textarea__message {
  color: #ff5959 !important;
}
</style>