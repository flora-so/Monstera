<template>
  <div class="msr-dropdown" ref="dropdown">
    <div class="msr-dropdown__component" @click="_show = !_show">
      <slot></slot>
    </div>
    <ul class="msr-dropdown__list" :show="_show">
      <DropdownListItem
        v-for="item in items"
        :item="item"
        :colour="colour"
        @click="() => _update(item.value)"
      >
        <template #[item.value]="{ label, value }">
          <slot :name="item.value" :label="label" :value="value"></slot>
        </template>
      </DropdownListItem>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import DropdownListItem from "./DropdownListItem.vue";
import { DropdownAlignment, type DropdownItem, Colours } from "../../types";

export default defineComponent({
  name: "Dropdown",
  props: {
    alignment: {
      type: String as PropType<DropdownAlignment>,
      default: () => DropdownAlignment.left,
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
  components: { DropdownListItem }
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

.msr-dropdown__list[show="false"] {
  transform: scaleY(0);
}

.msr-dropdown__list[show="true"] {
  transform: scaleY(1);
}
</style>