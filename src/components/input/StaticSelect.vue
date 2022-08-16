<template>
  <div class="msr-static-select" ref="dropdown">
    <div class="msr-static-select__component" @click="_show = !_show">
      <static-input v-model="_display" :label="label" @keydown="_handleKeys">
        <template #trailing="{ width, height, colour }">
          <svg class="msr-static-select__icon" :width="width" :height="height" :fill="colour" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg" :show="_show">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </template>
      </static-input>
    </div>
    <ul class="msr-static-select__list msr-dropdown-list__list" :show="_show">
      <slot v-for="(item, i) in items" :name="item.value" :key="item.value" :item="item" :click="() => _update(item)">
        <dropdown-list-item :item="item" :colour="colour" :selected="_index == i" @click="() => _update(item)">
        </dropdown-list-item>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import DropdownListItem from "./DropdownListItem.vue";
import StaticInput from "./StaticInput.vue";
import { type DropdownItem, Colours, Theme } from "../../types";

export default defineComponent({
  name: "StaticSelect",
  inject: ["theme"],
  props: {
    label: {
      type: String,
      required: true,
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
    },
    modelValue: {
      type: [String, Array],
    },
  },
  emits: {
    change(value: string) {
      return typeof value == "string";
    },
    "update:modelValue": (value: string | string[]) => {
      return true
    }
  },
  components: { DropdownListItem, StaticInput },
  data() {
    return {
      _show: false,
      _index: 0,
    };
  },
  computed: {
    _display() {
      return this.items.find(item => item.value == this.modelValue)?.label ?? "";
    },
    backgroundColour() {
      return (this as any)['theme'] == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | string[]) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    _update(item: DropdownItem) {
      this.$emit("change", item.value);
      this.value = item.value;

      this._show = false;
    },
    _handleKeys(e: KeyboardEvent) {
      if (e.key == "Tab" || e.key == "Escape") {
        return this._show = false;
      }
      e.preventDefault();
      if (e.key == "ArrowDown" && (this._index < this.items.length - 1)) {
        this._index++;
      } else if (e.key == "ArrowUp" && this._index > 0) {
        this._index--;
      } else if (e.key == "Enter") {
        if (this._show) {
          return this._update(this.items[this._index]);
        }
        this._show = true;
      }
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

    this.value = this.modelValue;
  },
});
</script>

<style scoped>
.msr-static-select {
  position: relative;
}

.msr-static-select .msr-static-select__component :deep(.msr-static-input input) {
  cursor: pointer;
  caret-color: transparent;
}

.msr-static-select__component:hover,
.msr-static-select .msr-static-select__component :deep(.msr-static-input) {
  cursor: pointer;
}

.msr-static-select .msr-static-select__list {
  margin-top: -13px;
  width: 100%;
  position: absolute;
  direction: ltr;
  white-space: nowrap;

  background-color: v-bind(backgroundColour);

  border-radius: 8px;
  box-shadow: 0px 2px 13px rgba(125, 125, 125, 0.21);
  transform-origin: left top;
  z-index: 999;

  transition: all ease-out 100ms;
}

.msr-static-select .msr-static-select__list[show="false"] {
  transform: scaleY(0);
}

.msr-static-select .msr-static-select__list[show="true"] {
  transform: scaleY(1);
}

.msr-static-select .msr-static-select__icon {
  transition: all ease-out 100ms;
}

.msr-static-select .msr-static-select__icon[show="true"] {
  transform: rotate(180deg);
}
</style>