<template>
  <div @click="forceFocus" class="msr-animated-date-input" :error="_error" :disabled="disabled">
    <div class="msr-animated-date-input__input">
      <div class="msr-animated-date-input__wrapper" :f="_focus">
        <div class="msr-animated-date-input__icon">
          <slot name="leading" width="20px" height="20px" colour="#585858" :tailwind="_tailwind"></slot>
        </div>
        <input :id="_id" :type="type" ref="input" placeholder=" " :disabled="disabled" v-model="_modelValue"
          @input="_input" @focus="_focus = true" @blur="validate" />
        <label :for="_id">{{ label }}</label>
        <div class="msr-animated-date-input__icon msr-animated-date-input__calendar">
          <svg width="21px" height="21px" fill="#585858" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>
    <p class="msr-animated-date-input__message">{{ _message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, DateInputType, type InputContext, type InputValidator } from "../../types";

export default defineComponent({
  name: "AnimatedDateInput",
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
      type: String as PropType<DateInputType>,
      default: () => DateInputType.date
    },
    validator: {
      type: Function as PropType<InputValidator>
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
      return `msr-animated-date-input${Math.random().toString(16).slice(2)}`;
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
.msr-animated-date-input {
  position: relative;
}

.msr-animated-date-input[disabled="false"] {
  cursor: text;
}

.msr-animated-date-input .msr-animated-date-input__wrapper {
  display: flex;

  padding: 0px 13px;
  border-radius: 8px;
  background-color: #7f7f7f1a;
  transition: all ease-out 300ms;
}

.msr-animated-date-input .msr-animated-date-input__wrapper input {
  /* padding: 13px; */
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 100%;

  outline: none;
  border: none;
  background-color: transparent;
}

.msr-animated-date-input .msr-animated-date-input__wrapper input::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
}

.msr-animated-date-input .msr-animated-date-input__calendar {
  position: absolute;
  right: 13px;
  pointer-events: none;
}

.msr-animated-date-input .msr-animated-date-input__icon {
  align-self: center;
}

.msr-animated-date-input .msr-animated-date-input__icon:not(:empty)~label {
  padding-left: 21px;
}

.msr-animated-date-input input {
  padding: 18px 0px 8px 0px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 100%;

  outline: none;
  border: none;
  background-color: transparent;
}

.msr-animated-date-input label {
  display: flex;
  position: absolute;
  user-select: none;

  cursor: text;
  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;
  transform: translate(0px, 15px);

  transition: all ease-out 100ms;
}

.msr-animated-date-input[disabled="false"]:hover .msr-animated-date-input__wrapper[f="false"] {
  background-color: #7f7f7f0d;
  box-shadow: 0px 0px 0px 4px v-bind(_backgroundColour);
}

/* Input Focus */
.msr-animated-date-input input:focus+label,
.msr-animated-date-input input:not(:placeholder-shown)+label {
  font-size: 0.625rem;
  line-height: 0.813rem;
  font-weight: normal;

  transform: translate(0px, 5px);
}

.msr-animated-date-input .msr-animated-date-input__wrapper[f="true"] {
  background-color: v-bind(_backgroundColour);
}

.msr-animated-date-input input:focus+label {
  color: v-bind(_colour);
}

/* Message */
.msr-animated-date-input .msr-animated-date-input__message {
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

.msr-animated-date-input .msr-animated-date-input__message:not(:empty) {
  transform: translate(0px, 0px);
  margin-bottom: 0rem;
  z-index: 0;
}

/* Error */
.msr-animated-date-input[error="true"] .msr-animated-date-input__wrapper {
  background-color: #ff595921;
}

.msr-animated-date-input[error="true"] label,
.msr-animated-date-input[error="true"] .msr-animated-date-input__message {
  color: #ff5959 !important;
}
</style>