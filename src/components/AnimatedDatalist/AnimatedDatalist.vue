<script lang="ts" setup>
/* Imports */
import { reactive, computed, inject, ref } from "vue";

import { type DropdownItem, InjectedKeys, Colour, Theme } from "../../types";

import DropdownListItem from "../DropdownListItem/DropdownListItem.vue";
import AnimatedInput from "../AnimatedInput/AnimatedInput.vue";




/* States */
const props = defineProps<{
  label: string,
  items: DropdownItem[],
  colour: Colour,
  modelValue: string | string[],
}>();

const emit = defineEmits<{
  (e: "change", value: string): void,
  (e: "update:modelValue", value: string | string[]): void,
}>();

const dropdown = ref<HTMLElement | null>(null);

const state = reactive({
  _show: false,
  _searchVal: "",
  _index: 0,
});

const theme = inject(InjectedKeys.theme);



/* Computed */
const equal = (val: string) => val.split(" ").join("").toLowerCase();

const listItems = computed(() => props.items
  .filter(item => equal(item.label).includes(equal(_search.value)))
  ?.sort((a, b) => a.value.localeCompare(b.value))
  ?.slice(0, 5) ?? []
);

const backgroundColour = computed(() => (theme!.value == Theme.dark ? "var(--dark-background)" : "var(--light-background)"));

const _search = computed({
  get() {
    return props.items.find(item => item.value == props.modelValue)?.label ?? state._searchVal;
  },
  set(keyword: string) {
    let item = props.items.find(item => item.label == keyword);
    state._searchVal = item?.label ?? keyword;
    value.value = item?.value ?? "";
  }
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value: string | string[]) {
    emit("update:modelValue", value);
  }
});




/* Methods */
const _update = (item: DropdownItem) => {
  emit("change", item.value);
  _search.value = item.label;

  state._show = false;
}

const _showList = () => {
  state._show = true;
  state._index = 0;
}

const _handleList = (e: KeyboardEvent) => {
  if (e.key == "Tab" || e.key == "Escape") {
    return state._show = false;
  }

  if (e.key == "ArrowDown" && (state._index < listItems.value.length - 1)) {
    state._index++;
  } else if (e.key == "ArrowUp" && state._index > 0) {
    state._index--;
  } else if (e.key == "Enter") {
    _update(listItems.value[state._index]);
  }
}

const _handleClick = (e: MouseEvent) => {
  if (state._show) {
    if (e.target == dropdown.value || e.composedPath().includes(dropdown.value!)) {
      return;
    }
    state._show = false;
  }
}



/* Initialization */
const main = () => {
  value.value = props.modelValue;
}

main();
</script>

<template>
  <div class="msr-animated-datalist" ref="dropdown" @click="_handleClick">
    <div class="msr-animated-datalist__component" @click="_showList">
      <animated-input :label="label" v-model="_search" @focus="_showList" @keydown="_handleList"></animated-input>
    </div>
    <ul class="msr-animated-datalist__list msr-dropdown-list__list" :show="state._show">
      <slot v-for="(item, i) in listItems" :key="item.value" :name="item.value" :item="item" :click="() => _update(item)">
        <dropdown-list-item :item="item" :colour="colour" :selected="state._index == i" @click="() => _update(item)">
        </dropdown-list-item>
      </slot>
    </ul>
  </div>
</template>

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