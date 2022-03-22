<template>
  <div class="msr-checkbox">
    <input :id="_id" type="checkbox" @change="_change" />
    <label :for="_id">
      <div class="msr-checkbox__box">
        <svg
          class="msr-checkbox__tick"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Checkbox",
  props: {
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    size: {
      type: Number,
      default: () => 18,
    }
  },
  computed: {
    _id() {
      return `msr-animated-text-field${Math.random().toString(16).slice(2)}`;
    },
    _colour() {
      if (['primary', 'accent']
        .includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _size() {
      return `${this.size}px`;
    }
  },
  methods: {
    _change() {
      this.$emit("change", (this.$refs.input as HTMLInputElement).checked);
    }
  }
});
</script>

<style scoped>
.msr-checkbox input {
  display: none;
}

.msr-checkbox label {
  cursor: pointer;
}

.msr-checkbox .msr-checkbox__box {
  border-radius: 3px;
  transition: all ease-out 150ms;
}

.msr-checkbox .msr-checkbox__box .msr-checkbox__tick {
  width: v-bind(_size);

  transition: all ease-out 150ms;
}

.msr-checkbox input:checked + label .msr-checkbox__box {
  border: 1px solid transparent;
  background-color: v-bind(_colour);
}

.msr-checkbox input:not(:checked) + label .msr-checkbox__box {
  border: 1px solid #7f7f7f36;
  background-color: transparent;
}

.msr-checkbox input:checked + label .msr-checkbox__box .msr-checkbox__tick {
  transform: scale(1, 1);
  filter: invert(1);
}

.msr-checkbox
  input:not(:checked)
  + label
  .msr-checkbox__box
  .msr-checkbox__tick {
  transform: scale(0, 0);
  filter: invert(1);
}
</style>