<template>
  <span class="msr-dropdown-list-item">
    <slot>
      <li>{{ item.label }}</li>
    </slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Colours, type DropdownItem } from "../../types";

export default defineComponent({
  name: "DropdownListItem",
  props: {
    item: {
      type: Object as PropType<DropdownItem>,
      required: true,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) => Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  computed: {
    _colour() {
      let colour = this.item.colour ?? this.colour;

      if (Object.keys(Colours).includes(colour)) {
        return `rgb(var(--${colour}))`;
      }
      else {
        return colour;
      }
    },
    _hoverColour() {
      let colour = this.item.colour ?? this.colour;

      if (Object.keys(Colours).includes(colour)) {
        return `rgba(var(--${colour}), 0.21)`;
      }
      else {
        return `${colour}36`;
      }
    },
  },
});
</script>

<style scoped>
.msr-dropdown-list__list .msr-dropdown-list-item {
  display: flex;
  align-items: center;
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

.msr-dropdown-list__list .msr-dropdown-list-item:hover {
  color: v-bind(_colour);
  background-color: v-bind(_hoverColour);
}
</style>