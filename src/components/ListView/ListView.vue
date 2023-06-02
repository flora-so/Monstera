<template>
  <div class="msr-list-view" ref="msrListView">
    <ul>
      <li class="msr-list-view__wrapper" v-for="data of dataframe.data" :key="data.id">
        <div class="msr-list-view__item" :selected="selected.indexOf(data.id) > -1" @click="_rowSelected(data)">
          <div class="msr-list-view__image_wrapper" :image="image" :row="data">
            <list-view-image :src="_srcPasrser(data[image])" :value="data.id" :colour="colour" :disabled="!checkbox"
              v-model="selected">
              <template #image>
                <slot name="image" :data="data[title]" :row="data"></slot>
              </template>
            </list-view-image>
          </div>
          <div class="msr-list-view__content">
            <div class="msr-list-view__title">
              <slot name="title" :data="data[title]" :row="data">
                <h4>{{ data[title] }}</h4>
              </slot>
            </div>
            <div class="msr-list-view__subtitle">
              <slot name="subtitle" :data="data[subtitle]" :row="data">
                <span :subtitle="subtitle">{{ data[subtitle] }}</span>
              </slot>
            </div>
            <div class="msr-list-view__description">
              <slot name="description" :data="data[description]" :row="data">
                <p :description="description">{{ data[description] }}</p>
              </slot>
            </div>
          </div>
          <div v-if="!!actions" class="msr-list-view__actions">
            <slot name="action" :row="data">
              <dropdown-list :items="_actions" :alignment="dropdownAlignment.right"
                @change="value => _handleAction(value, data)">
                <icon-button :colour="_iconColour">
                  <template #icon="{ width, height, colour }">
                    <svg :width="width" :height="height" :fill="colour" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z">
                      </path>
                    </svg>
                  </template>
                </icon-button>
              </dropdown-list>
            </slot>
          </div>
        </div>

        <hr :image="image" :divider="divider">
      </li>

      <li v-if="loading">
        <circular-progress></circular-progress>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type DataFrame, type ActionItem, type DropdownItem, Colours, Theme, DropdownAlignment, InjectedKeys } from "../../types";
import ListViewImage from "./ListViewImage.vue";
import DropdownList from "../DropdownList/DropdownList.vue";
import IconButton from "../IconButton/IconButton.vue";
import CircularProgress from "../CircularProgress/CircularProgress.vue";

export default defineComponent({
  name: "ListView",
  components: {
    ListViewImage,
    DropdownList,
    IconButton,
    CircularProgress,
  },
  inject: {
    theme: {
      from: InjectedKeys.theme
    },
    scroll: {
      from: InjectedKeys.scroll
    },
    context: {
      from: InjectedKeys.context
    }
  },
  props: {
    dataframe: {
      type: Object as PropType<DataFrame>,
      required: true,
    },
    colour: {
      type: String as PropType<Colours | string>,
      default: () => Colours.primary,
      validator: (value: string) =>
        Object.keys(Colours).includes(value) ||
        new RegExp("^#([A-Fa-f0-9]{6})$").test(value)
    },
    image: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    rowCount: {
      type: Number,
      default: 20,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    modelValue: Array,
    pageAction: Function as PropType<(page: number) => Promise<void>>,
    actions: Array as PropType<ActionItem[]>,
    checkbox: Boolean,
    divider: Boolean,
  },
  emits: {
    change(value: string[]) {
      return true;
    },
    row(row: object) {
      return true;
    },
    "update:modelValue": (value: string[]) => {
      return true;
    }
  },
  data() {
    return {
      _selected: [] as string[],
      _page: 0,
      _maxPage: -1,
      loading: false,
    }
  },
  computed: {
    dropdownAlignment() {
      return DropdownAlignment;
    },
    _srcPasrser: () => (src: any) => src,
    selected: {
      get() {
        return this.modelValue ?? this._selected;
      },
      set(value: string[]) {
        this._selected = value;
        this.$emit("change", value);
        this.$emit("update:modelValue", value);
      }
    },
    _colour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgb(var(--${this.colour}))`;
      } else {
        return this.colour;
      }
    },
    _backgroundColour() {
      if (Object.keys(Colours).includes(this.colour)) {
        return `rgba(var(--${this.colour}), 0.13)`;
      } else {
        return `${this.colour}21`;
      }
    },
    _actions(): DropdownItem[] {
      if (!this.actions) {
        return [];
      }
      return this.actions!.map(item => ({
        label: item.label,
        value: item.label,
        colour: item.colour,
      }));
    },
    _iconColour() {
      return (this as any)['theme'] == Theme.dark ? "#ffffff" : "#000000";
    },
    _currentData() {
      return (page: number) => {
        if (!this.lazyLoad) {
          return this.dataframe;
        }

        const start = page * this.rowCount;
        return this.dataframe.slice(start, this.rowCount * (page + 1));
      }
    },
  },
  watch: {
    scroll() {
      if ((this.$refs.msrListView as HTMLElement).getBoundingClientRect().bottom < (window.innerHeight + 89)) {
        this._loadMore(1);
      }
    }
  },
  methods: {
    _rowSelected(row: object) {
      this.$emit("row", row);
    },
    _handleAction(value: any, data: object) {
      this.actions!.forEach(item => {
        if (item.label === value) {
          return item.method(data);
        }
      });
    },
    async _loadMore(page: number) {
      if (!this.lazyLoad || this._page == this._maxPage || this.loading) {
        return;
      }

      this.loading = true;
      await this.pageAction?.(page);

      const newPage = this._page + page;
      if (this._currentData(newPage).length > 0) {
        this._page = this._page + page;

        if (this._currentData(newPage).length < this.rowCount) {
          this._maxPage = this._page;
        }
      } else if (this._currentData(newPage).length == 0
        && page == 1) {
        this._maxPage = this._page;
      }

      this.loading = false;
    }
  }
});
</script>

<style scoped>
.msr-list-view {
  width: 100%;
}

.msr-list-view ul .msr-list-view__item {
  display: flex;
  align-items: center;

  border-radius: 13px;
  padding: 8px 13px;
  margin: 8px 0px;
  cursor: pointer;

  transition: all ease-in-out 150ms;
}

.msr-list-view ul .msr-list-view__item:hover {
  background-color: #7d7d7d21;
}

.msr-list-view ul .msr-list-view__item[selected="true"] {
  background-color: v-bind(_backgroundColour);
}

.msr-list-view ul .msr-list-view__wrapper hr:not([divider="true"]) {
  border-top-width: 0px;
}

.msr-list-view ul .msr-list-view__wrapper hr {
  border-color: #7d7d7d34;
  border-top-width: 1px;
}

.msr-list-view ul .msr-list-view__wrapper hr[image=""] {
  margin: 0px 13px;
}

.msr-list-view ul .msr-list-view__wrapper hr:not([image=""]) {
  margin: 0px 13px 0px 84px;
}

.msr-list-view ul .msr-list-view__wrapper:last-child hr {
  display: none;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__image_wrapper {
  margin-right: 8px;
  min-width: 55px;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__image_wrapper[image=""] {
  display: none;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content {
  width: calc(100%);
  overflow-x: hidden;
  overflow-y: visible;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content .msr-list-view__title {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;

  white-space: nowrap;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content .msr-list-view__title * {
  text-overflow: ellipsis;
  overflow: hidden;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content .msr-list-view__subtitle {
  font-size: 1rem;
  line-height: 1.25rem;
  color: #7d7d7d;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content .msr-list-view__description {
  font-size: 0.875rem;
  line-height: 1rem;
  color: #7d7d7d;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__actions {
  margin-left: auto;
}
</style>