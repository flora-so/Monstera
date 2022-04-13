<template>
  <div class="msr-dropdown" ref="dropdown">
    <div class="msr-dropdown__component" @click="_show = !_show">
      <slot></slot>
    </div>
    <ul class="msr-dropdown__list" :show="_show" :position="position">
      <slot v-for="item in items" :name="item.value" :label="item.label" :value="item.value" :colour="item.colour">
        <dropdown-list-item :item="item" :colour="colour" @click="() => _update(item.value)">
        </dropdown-list-item>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import DropdownListItem from "./DropdownListItem.vue";
import { DropdownAlignment, DropdownPosition, type DropdownItem, Colours } from "../../types";

export default defineComponent({
  name: "Dropdown",
  props: {
    alignment: {
      type: String as PropType<DropdownAlignment>,
      default: () => DropdownAlignment.left,
    },
    position: {
      type: String as PropType<DropdownPosition>,
      default: () => DropdownPosition.bottom,
    },
    items: {
      type: Array as PropType<DropdownItem[]>,
      required: true
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: Colours | string) => Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    }
  },
  emits: {
    change(value: string) {
      return typeof value == "string";
    }
  },
  components: { DropdownListItem },
  data() {
    return {
      _show: false,
    };
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
    });
  },
});
</script>

<style scoped>
.msr-dropdown {
  position: relative;
  direction: v-bind(alignment);
}

.msr-dropdown .msr-dropdown__list {
  position: absolute;
  direction: ltr;
  white-space: nowrap;

  background-color: white;

  border-radius: 8px;
  box-shadow: 0px 2px 13px rgba(125, 125, 125, 0.21);
  transform-origin: left top;
  margin-top: 5px;

  transition: all ease-out 100ms;
}

.msr-dropdown .msr-dropdown__list[show="false"] {
  transform: scaleY(0);
}

.msr-dropdown .msr-dropdown__list[show="true"] {
  transform: scaleY(1);
}

.msr-dropdown .msr-dropdown__list[position="right"] {
  top: 0%;
  left: 100%;
  margin-top: 0px;
  margin-left: 5px;
}

.msr-dropdown .msr-dropdown__list[position="left"] {
  top: 0%;
  right: 100%;
  margin-top: 0px;
  margin-right: 5px;
}

.msr-dropdown .msr-dropdown__list[position="top"] {
  bottom: calc(0% + 34px);
  transform-origin: left bottom;
}
</style>