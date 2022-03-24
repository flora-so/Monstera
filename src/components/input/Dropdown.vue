<template>
  <div class="msr-dropdown" ref="dropdown">
    <div class="msr-dropdown__component" @click="_show = !_show">
      <slot name="component"></slot>
    </div>
    <ul class="msr-dropdown__list" :show="_show">
      <li
        v-for="item in items"
        class="msr-dropdown__list-item"
        @click="() => _update(item.value)"
      >{{ item.label }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { DirectiveBinding, Prop, PropType } from "vue";
import { defineComponent } from "vue";
import type { DropdownItem } from "../../types";
import { DropdownAlignment } from "../../types";

export default defineComponent({
  name: "Dropdown",
  props: {
    colour: {
      type: String,
      default: () => "primary",
      validator: (value: string) =>
        ['primary', 'accent']
          .includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    alignment: {
      type: String as PropType<DropdownAlignment>,
      default: () => DropdownAlignment.left,
    },
    items: {
      type: Array as PropType<DropdownItem[]>,
      required: true
    }
  },
  data() {
    return {
      _show: false,
    };
  },
  emits: {
    change(value: string) {
      return typeof value == "string";
    }
  },
  computed: {
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
        return `rgba(var(--${this.colour}), 0.21)`;
      } else {
        return `${this.colour}36`;
      }
    },
  },
  methods: {
    _update(item: string) {
      this.$emit("change", item);
      this._show = false;
    }
  },
  mounted() {
    let dropdown = this.$refs.dropdown as HTMLElement;

    addEventListener("click", (e) => {
      if (this._show) {
        if (e.target == dropdown || e.composedPath().includes(dropdown)) {
          return;
        }

        this._show = false;
      }
    })
  }
});
</script>

<style scoped>
.msr-dropdown {
  direction: v-bind(alignment);
}

.msr-dropdown .msr-dropdown__list {
  position: absolute;
  direction: ltr;

  background-color: white;

  border-radius: 8px;
  box-shadow: 0px 2px 13px rgba(125, 125, 125, 0.21);
  transform-origin: left top;
  margin-top: 5px;

  transition: all ease-out 100ms;
}

.msr-dropdown__list .msr-dropdown__list-item {
  cursor: pointer;
  user-select: none;

  color: #585858;
  font-size: 1rem;
  line-height: 1.313rem;
  font-weight: 500;

  padding: 8px 10px;
  margin: 3px;
  border-radius: 5px;

  transition: all ease-out 150ms;
}

.msr-dropdown__list .msr-dropdown__list-item:hover {
  color: v-bind(_colour);
  background-color: v-bind(_hoverColour);
}

.msr-dropdown__list[show="false"] {
  transform: scaleY(0);
}

.msr-dropdown__list[show="true"] {
  transform: scaleY(1);
}
</style>