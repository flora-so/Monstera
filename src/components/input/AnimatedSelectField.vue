<template>
  <div class="msr-static-select-field" ref="dropdown">
    <div class="msr-static-select-field__component" @click="_show = !_show">
      <animated-text-field v-model="_display" :label="label" disabled>
        <template #trailing="{ width, height, colour }">
          <svg class="msr-static-select-field__icon" :width="width" :height="height" :fill="colour" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg" :show="_show">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
        </template>
      </animated-text-field>
    </div>
    <ul class="msr-static-select-field__list msr-dropdown-list__list" :show="_show">
      <slot v-for="item in items" :name="item.value" :key="item.value" :item="item" :click="() => _update(item)">
        <dropdown-list-item :item="item" :colour="colour" @click="() => _update(item)">
        </dropdown-list-item>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import DropdownListItem from "./DropdownListItem.vue";
import AnimatedTextField from "./AnimatedTextField.vue";
import { type DropdownItem, Colours, Theme } from "../../types";

export default defineComponent({
  name: "StaticSelectField",
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
  components: { DropdownListItem, AnimatedTextField },
  data() {
    return {
      _show: false,
      _display: "",
    };
  },
  computed: {
    backgroundColour() {
      return (this as any)['theme'] == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | string[]) {
        this._display = this.items.find(item => item.value == value)?.label ?? "";
        this.$emit("update:modelValue", value)
      }
    }
  },
  methods: {
    _update(item: DropdownItem) {
      this.$emit("change", item.value);
      this.value = item.value;

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
.msr-static-select-field {
  position: relative;
}

.msr-static-select-field__component:hover {
  cursor: pointer;
}

.msr-static-select-field .msr-static-select-field__list {
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

.msr-static-select-field .msr-static-select-field__list[show="false"] {
  transform: scaleY(0);
}

.msr-static-select-field .msr-static-select-field__list[show="true"] {
  transform: scaleY(1);
}

.msr-static-select-field .msr-static-select-field__icon {
  transition: all ease-out 100ms;
}

.msr-static-select-field .msr-static-select-field__icon[show="true"] {
  transform: rotate(180deg);
}
</style>