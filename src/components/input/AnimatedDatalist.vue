<template>
  <div class="msr-animated-datalist" ref="dropdown">
    <div class="msr-animated-datalist__component" @click="_handleClick">
      <animated-input :label="label" v-model="_search" @keydown="_handleList"></animated-input>
    </div>
    <ul class="msr-animated-datalist__list msr-dropdown-list__list" :show="_show">
      <slot v-for="item in listItems" :name="item.value" :key="item.value" :item="item" :click="() => _update(item)">
        <dropdown-list-item :item="item" :colour="colour" @click="() => _update(item)">
        </dropdown-list-item>
      </slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import DropdownListItem from "./DropdownListItem.vue";
import AnimatedInput from "./AnimatedInput.vue";
import { type DropdownItem, Colours, Theme } from "../../types";

export default defineComponent({
  name: "AnimatedDatalist",
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
  components: { DropdownListItem, AnimatedInput },
  data() {
    return {
      _show: false,
      _search: "",
      _index: 0,
    };
  },
  watch: {
    modelValue(value: string | string[]) {
      this.value = value;
    },
  },
  computed: {
    equal() {
      return (val: string) => val.split(" ").join("").toLowerCase();
    },
    listItems(): DropdownItem[] {
      return this.items
        .filter(item => this.equal(item.label).includes(this.equal(this._search)))
        ?.slice(0, 5) ?? [];
    },
    backgroundColour() {
      return (this as any)['theme'] == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | string[]) {
        this._search = this.items.find(item => item.value == value)?.label ?? "";
        this.$emit("update:modelValue", value)
      }
    }
  },
  methods: {
    _update(item: DropdownItem) {
      this.$emit("change", item.value);
      this.value = item.value;
      this._search = item.label;

      this._show = false;
    },
    _handleClick() {
      this._show = true;
      this._index = 0;
    },
    _handleList(e: KeyboardEvent) {
      if (e.key == "ArrowDown" && (this._index < this.listItems.length - 1)) {
        this._index++;
      } else if (e.key == "ArrowUp" && this._index > 0) {
        this._index--;
      } else if (e.key == "Enter") {
        this._update(this.listItems[this._index]);
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
.msr-animated-datalist {
  position: relative;
}

.msr-animated-datalist__component:hover {
  cursor: pointer;
}

.msr-animated-datalist .msr-animated-datalist__list {
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

.msr-animated-datalist .msr-animated-datalist__list[show="false"] {
  transform: scaleY(0);
}

.msr-animated-datalist .msr-animated-datalist__list[show="true"] {
  transform: scaleY(1);
}

.msr-animated-datalist .msr-animated-datalist__icon {
  transition: all ease-out 100ms;
}

.msr-animated-datalist .msr-animated-datalist__icon[show="true"] {
  transform: rotate(180deg);
}
</style>