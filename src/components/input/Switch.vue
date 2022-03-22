<template>
  <div class="msr-switch">
    <input :id="_id" ref="input" type="checkbox" @change="_change" :checked="checked" />
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

export default defineComponent({
  name: "Switch",
  props: {
    label: String,
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    multiselect: Boolean,
    checked: Boolean
  },
  emits: {
    change: (value: Boolean) => {
      return typeof value === "boolean"
    }
  },
  computed: {
    _id() {
      return `msr-chips${Math.random().toString(16).slice(2)}`;
    },
    _colour() {
      if (['primary', 'accent']
        .includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _hoverColour() {
      if (['primary', 'accent']
        .includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.34)`;
      } else {
        return `${this.colour}57`;
      }
    },
  },
  methods: {
    _change() {
      this.$emit("change", (this.$refs.input as HTMLInputElement).checked);
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
  padding: 5px;
  background-color: #7f7f7f36;
  border-radius: 20px;
  margin-right: 13px;

  transition: all ease-out 300ms;
}

.msr-switch .msr-switch__toggle {
  width: 24px;
  height: 24px;
  border-radius: 24px;

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
  margin-right: 24px;
}

.msr-switch input:checked + label .msr-switch__background .msr-switch__toggle {
  margin-left: 24px;
}

.msr-switch input:checked + label .msr-switch__background {
  color: white;
  background-color: v-bind(_colour);
}
</style>