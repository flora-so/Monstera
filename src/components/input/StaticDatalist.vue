<template>
  <div class="msr-static-datalist" ref="dropdown">
    <div class="msr-static-datalist__component" @click="_showList">
      <static-input :label="label" v-model="_search" @focus="_showList" @keydown="_handleList"></static-input>
    </div>
    <ul class="msr-static-datalist__list msr-dropdown-list__list" :show="_show">
      <slot v-for="(item, i) in listItems" :key="item.value" :name="item.value" :item="item"
        :click="() => _update(item)">
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
  name: "StaticDatalist",
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
      _searchVal: "",
      _index: 0,
    };
  },
  computed: {
    equal() {
      return (val: string) => val.split(" ").join("").toLowerCase();
    },
    listItems(): DropdownItem[] {
      return this.items
        .filter(item => this.equal(item.label).includes(this.equal(this._search)))
        ?.sort((a, b) => a.value.localeCompare(b.value))
        ?.slice(0, 5) ?? [];
    },
    backgroundColour() {
      return (this as any)['theme'] == Theme.dark ? "var(--dark-background)" : "var(--light-background)";
    },
    _search: {
      get() {
        return this.items.find(item => item.value == this.modelValue)?.label ?? this._searchVal;
      },
      set(value: string) {
        let item = this.items.find(item => item.label == value);
        this._searchVal = item?.label ?? value;
        this.value = item?.value ?? "";
      }
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string | string[]) {
        this.$emit("update:modelValue", value)
      }
    }
  },
  methods: {
    _update(item: DropdownItem) {
      this.$emit("change", item.value);
      this._search = item.label;

      this._show = false;
    },
    _showList() {
      this._show = true;
      this._index = 0;
    },
    _handleList(e: KeyboardEvent) {
      if (e.key == "Tab" || e.key == "Escape") {
        return this._show = false;
      }

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
.msr-static-datalist {
  position: relative;
}

.msr-static-datalist__component:hover {
  cursor: pointer;
}

.msr-static-datalist .msr-static-datalist__list {
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

.msr-static-datalist .msr-static-datalist__list[show="false"] {
  transform: scaleY(0);
}

.msr-static-datalist .msr-static-datalist__list[show="true"] {
  transform: scaleY(1);
}

.msr-static-datalist .msr-static-datalist__icon {
  transition: all ease-out 100ms;
}

.msr-static-datalist .msr-static-datalist__icon[show="true"] {
  transform: rotate(180deg);
}
</style>