<template>
  <div class="msr-list-view">
    <ul>
      <li class="msr-list-view__wrapper" v-for="(data, index) of dataframe.data" :key="index">
        <div class="msr-list-view__item" :selected="_selected.indexOf(index.toString()) > -1"
          @click="_rowSelected(data, index)">
          <div class="msr-list-view__image" :image="image" :row="data">
            <slot name="image">
              <list-view-image :src="(data[image] as string)" :value="index.toString()" :colour="colour"
                :disabled="!checkbox" v-model="_selected" @change="_change">
              </list-view-image>
            </slot>
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
                @change="(value: string) => _handleAction(value, data)">
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
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { type DataFrame, type ActionItem, type DropdownItem, Colours, Theme, DropdownAlignment, InjectedKeys } from "../../types";
import ListViewImage from "./ListViewImage.vue";
import DropdownList from "../input/DropdownList.vue";
import IconButton from "../button/IconButton.vue";

export default defineComponent({
  name: "ListView",
  components: {
    ListViewImage,
    DropdownList,
    IconButton,
  },
  inject: {
    theme: {
      from: InjectedKeys.theme
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
    actions: Array as PropType<ActionItem[]>,
    checkbox: Boolean,
    divider: Boolean,
  },
  emits: {
    change(value: object[]) {
      return true;
    },
    row(row: object) {
      return true;
    }
  },
  data() {
    return {
      _selected: [],
    }
  },
  computed: {
    dropdownAlignment() {
      return DropdownAlignment;
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
    }
  },
  methods: {
    _change() {
      const selected: object[] = [];

      this._selected.forEach((index: number) => {
        selected.push(this.dataframe.data[index])
      });

      this.$emit("change", selected);
    },
    _rowSelected(row: object, index: number) {
      this.$emit("row", row);
    },
    _handleAction(value: string, data: object) {
      this.actions!.forEach(item => {
        if (item.label === value) {
          return item.method(data);
        }
      });
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

.msr-list-view ul .msr-list-view__item .msr-list-view__image {
  margin-right: 8px;
  border-radius: 55px;
  overflow: hidden;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__image[image=""] {
  display: none;
}

.msr-list-view ul .msr-list-view__item .msr-list-view__content .msr-list-view__title {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
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