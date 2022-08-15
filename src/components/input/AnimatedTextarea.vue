<template>
  <div @click="forceFocus" class="msr-animated-textarea" :error="_error" :disabled="disabled">
    <div class="msr-animated-textarea__input">
      <div class="msr-animated-textarea__wrapper" :f="_focus">
        <div class="msr-animated-textarea__icon">
          <slot name="leading" width="20px" height="20px" colour="#585858" :tailwind="_tailwind"></slot>
        </div>
        <textarea :id="_id" :type="type" ref="input" placeholder=" " :disabled="disabled" :rows="rows"
          v-model="_modelValue" @input="_input" @focus="_focus = true" @blur="validate"></textarea>
        <label :for="_id">{{ label }}</label>
        <div class="msr-animated-textarea__icon">
          <slot name="trailing" width="20px" height="20px" colour="#585858" :tailwind="_tailwind"></slot>
        </div>
      </div>
    </div>
    <p class="msr-animated-textarea__message">{{ _message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, InputType, type InputContext, type InputValidator } from "../../types";

export default defineComponent({
  name: "AnimatedTextarea",
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
      type: String as PropType<InputType>,
      default: () => InputType.text
    },
    validator: {
      type: Function as PropType<InputValidator>
    },
    rows: {
      type: Number,
      default: () => 3
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
    context(ctx: InputContext) {
      return ctx;
    }
  },
  computed: {
    _id() {
      return `msr-animated-textarea${Math.random().toString(16).slice(2)}`;
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
    forceFocus() {
      (this.$refs.input as HTMLInputElement).focus();
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
.msr-animated-textarea {
  position: relative;
}

.msr-animated-textarea[disabled="false"] {
  cursor: text;
}

.msr-animated-textarea .msr-animated-textarea__wrapper {
  display: flex;

  border-radius: 8px;
  background-color: #7f7f7f1a;
  transition: all ease-out 300ms;
}

.msr-animated-textarea .msr-animated-textarea__icon {
  align-self: center;
}

.msr-animated-textarea .msr-animated-textarea__icon:not(:empty)~label {
  padding-left: 21px;
}

.msr-animated-textarea textarea {
  padding: 18px 13px 8px 13px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 100%;

  outline: none;
  border: none;
  background-color: transparent;
}

.msr-animated-textarea label {
  display: flex;
  position: absolute;
  user-select: none;

  cursor: text;
  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;
  margin-left: 13px;
  transform: translate(0px, 15px);

  transition: all ease-out 100ms;
}

.msr-animated-textarea[disabled="false"]:hover .msr-animated-textarea__wrapper[f="false"] {
  background-color: #7f7f7f0d;
  box-shadow: 0px 0px 0px 4px v-bind(_backgroundColour);
}

/* Input Focus */
.msr-animated-textarea textarea:focus+label,
.msr-animated-textarea textarea:not(:placeholder-shown)+label {
  font-size: 0.625rem;
  line-height: 0.813rem;
  font-weight: normal;

  transform: translate(0px, 5px);
}

.msr-animated-textarea .msr-animated-textarea__wrapper[f="true"] {
  background-color: v-bind(_backgroundColour);
}

.msr-animated-textarea textarea:focus+label {
  color: v-bind(_colour);
}

/* Message */
.msr-animated-textarea .msr-animated-textarea__message {
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

.msr-animated-textarea .msr-animated-textarea__message:not(:empty) {
  transform: translate(0px, 0px);
  margin-bottom: 0rem;
  z-index: 0;
}

/* Error */
.msr-animated-textarea[error="true"] .msr-animated-textarea__wrapper {
  background-color: #ff595921;
}

.msr-animated-textarea[error="true"] label,
.msr-animated-textarea[error="true"] .msr-animated-textarea__message {
  color: #ff5959 !important;
}
</style>