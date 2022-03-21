<template>
  <div class="msr-chips">
    <input
      :id="_id"
      name="group"
      :type="multiselect ? 'checkbox' : 'radio'"
      @change="$emit('selected', _selected)"
      v-model="_selected"
    />
    <label :for="_id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    group: {
      type: String,
    },
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    multiselect: Boolean
  },
  emits: {
    selected(value: Boolean) {
      return typeof value === "boolean";
    }
  },
  data() {
    return {
      _selected: null,
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
  }
});
</script>

<style scoped>
.msr-chips input {
  display: none;
}

.msr-chips label {
  user-select: none;
  cursor: pointer;

  font-size: 1.125rem;
  line-height: 1.5rem;

  padding: 10px 20px;
  background-color: #7f7f7f1a;
  border-radius: 20px;

  transition: all ease-out 150ms;
}

.msr-chips label:hover {
  background-color: v-bind(_hoverColour);
}

.msr-chips input:checked + label {
  color: white;
  background-color: v-bind(_colour);
}
</style>