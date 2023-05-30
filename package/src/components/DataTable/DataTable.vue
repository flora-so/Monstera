<template>
  <div class="msr-table__wrapper">
    <div class="msr-table__border">
      <table class="msr-table" :full-width="fullWidth">
        <thead class="msr-table__head">
          <tr class="msr-table__row">
            <th v-if="checkbox" class="msr-table__column msr-table__column_checkbox">
              <div class="msr-table__checkbox">
                <monstera-checkbox ref="checkbox" :colour="colour" :intermediate="_intermediate" v-model="_allChecked">
                </monstera-checkbox>
              </div>
            </th>
            <th class="msr-table__column" v-for="(col, index) of _colName" :key="index" :focus-col="focusCol == index">
              {{ col }}</th>
            <th v-if="!!actions" class="msr-table__column"></th>
          </tr>
        </thead>

        <tbody class="msr-table__body" :pagination="pagination">
          <tr class="msr-table__row" :row-check="rowCheck" v-for="row in _currentData(_page).data" :key="row.id">
            <td v-if="checkbox" class="msr-table__data" :row-check="rowCheck">
              <div class="msr-table__checkbox">
                <monstera-checkbox :colour="colour" :value="row.id" v-model="selected"></monstera-checkbox>
              </div>
            </td>
            <td class="msr-table__data" v-for="col in dataframe.columns" :key="col" @click="_rowSelected(row)">
              <slot :name="col" :data="row[col]" :row="row">{{ row[col] }}</slot>
            </td>
            <td v-if="!!actions" class="msr-table__actions">
              <slot name="actions" :row="row">
                <dropdown-list :items="_actions" :alignment="dropdownAlignment.right"
                  @change="value => _handleAction(value, row)">
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
            </td>
          </tr>
        </tbody>
      </table>

      <div class="msr-table__pagination" v-if="pagination">
        <div class="msr-table__pagination_number">
          Showing {{ (_page * rowCount) + 1 }} - {{ (_page * rowCount) + _currentData(_page).length }} of {{ _total }}
        </div>
        <div class="msr-table__pagination_arrows">
          <icon-button @click="_updatePage(-1)" :disabled="_page == 0">
            <template #icon="{ width, height, colour }">
              <svg :fill="colour" :width="width" :height="height" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z">
                </path>
              </svg>
            </template>
          </icon-button>

          <icon-button @click="_updatePage(1)" :disabled="_page == _maxPage || (_total as number) < rowCount">
            <template #icon="{ width, height, colour }">
              <svg :fill="colour" :width="width" :height="height" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z">
                </path>
              </svg>
            </template>
          </icon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import MonsteraCheckbox from "../monsteraCheckbox/MonsteraCheckbox.vue";
import DropdownList from "../DropdownList/DropdownList.vue";
import IconButton from "../IconButton/IconButton.vue";
import LinkButton from "../LinkButton/LinkButton.vue";
import { type DataFrame, type ActionItem, type DropdownItem, Colours, DropdownAlignment, Theme, InjectedKeys } from "../../types";

export default defineComponent({
  name: "DataTable",
  components: {
    MonsteraCheckbox,
    DropdownList,
    IconButton,
    LinkButton,
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
    focusCol: {
      type: Number,
      default: 0,
    },
    rowCount: {
      type: Number,
      default: 20,
    },
    pageAction: Function as PropType<(page: number) => Promise<void>>,
    modelValue: Array as PropType<string[]>,
    actions: Array as PropType<ActionItem[]>,
    pagination: Boolean,
    checkbox: Boolean,
    rowCheck: Boolean,
    fullWidth: Boolean,
  },
  data() {
    return {
      _selected: [] as string[],
      _page: 0,
      _maxPage: -1,
    }
  },
  emits: {
    change(selected: string[]) {
      return true;
    },
    row(row: object) {
      return typeof row == "object";
    },
    "update:modelValue": (value: string[]) => {
      return true;
    }
  },
  computed: {
    dropdownAlignment() {
      return DropdownAlignment;
    },
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
    _allChecked: {
      get() {
        // return this.selected.length == this.dataframe.length;
        return this._currentData(this._page).id.every((id) => this.selected.includes(id));
      },
      set(value: boolean) {
        if (value) {
          this.selected = [...this.selected, ...this._currentData(this._page).id];
        } else {
          this.selected = this.selected.filter((id) => !this._currentData(this._page).id.includes(id));
        }
      }
    },
    _colName() {
      return this.dataframe.columns.map((col) => {
        return col.replace(/([^\p{L}\d]+|(?<=\p{L})(?=\d)|(?<=\d)(?=\p{L})|(?<=[\p{Ll}\d])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=[\p{L}\d])(?=\p{Lu}\p{Ll}))/gu, ' ');
      });
    },
    _intermediate() {
      return this._currentData(this._page).id.some((id) => this.selected.includes(id));
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
        if (!this.pagination) {
          return this.dataframe;
        }

        const start = page * this.rowCount;
        return this.dataframe.slice(start, this.rowCount * (page + 1));
      }
    },
    _total() {
      if (this.dataframe.data.length != this.rowCount
        && this._maxPage == -1) {
        return "many";
      }
      return this.dataframe.data.length;
    }
  },
  methods: {
    _rowSelected(row: { [key: string]: string | number, id: string }) {
      this.$emit("row", row);

      if (this.rowCheck) {
        if (this.selected.includes(row.id)) {
          this.selected = this.selected.filter((id) => id != row.id);
        } else {
          this.selected.push(row.id);
        }
      }
    },
    _handleAction(value: any, data: object) {
      this.actions!.forEach(item => {
        if (item.label === value) {
          return item.method(data);
        }
      });
    },
    async _updatePage(page: number) {
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
    }
  }
});
</script>

<style scoped>
.msr-table__wrapper {
  padding: 1px 2px;
}

.msr-table {
  border-style: hidden;

  white-space: nowrap;
}

.msr-table__wrapper .msr-table__border {
  border: 1px solid #7f7f7f36;
  border-radius: 8px;
}

.msr-table[full-width="true"] {
  width: 100%;
}

.msr-table .msr-table__head .msr-table__row .msr-table__column,
.msr-table .msr-table__body .msr-table__row .msr-table__data,
.msr-table .msr-table__body .msr-table__row .msr-table__actions {
  font-size: 1rem;
  line-height: 1.313rem;

  border-bottom: 1px solid #7f7f7f36;
}

.msr-table .msr-table__head .msr-table__row .msr-table__column {
  text-align: left;

  font-weight: 500;
  padding: 16px 16px;
}

.msr-table[full-width="true"] .msr-table__head .msr-table__row .msr-table__column[focus-col="true"] {
  width: 100%;
}

.msr-table .msr-table__head .msr-table__row .msr-table__column::first-letter {
  text-transform: capitalize;
}

.msr-table .msr-table__body .msr-table__row {
  transition: all ease-out 100ms;
}

.msr-table .msr-table__body .msr-table__row[row-check="true"] {
  cursor: pointer;
}

.msr-table .msr-table__body .msr-table__row:hover {
  background-color: #7f7f7f21;
}

.msr-table .msr-table__row .msr-table__column_checkbox {
  width: 0px;
}

.msr-table .msr-table__row .msr-table__checkbox {
  display: flex;
}

.msr-table .msr-table__body .msr-table__row .msr-table__data,
.ms-table .msr-table__body .msr-table__row .msr-table__actions {
  padding: 13px 16px;
}

.msr-table .msr-table__body[pagination="false"] .msr-table__row:last-child .msr-table__data:first-child {
  border-bottom-left-radius: 8px;
}

.msr-table .msr-table__body[pagination="false"] .msr-table__row:last-child .msr-table__data:last-child,
.msr-table .msr-table__body[pagination="false"] .msr-table__row:last-child .msr-table__actions {
  border-bottom-right-radius: 8px;
}

.msr-table .msr-table__body[pagination="false"] .msr-table__row:last-child .msr-table__data,
.msr-table .msr-table__body[pagination="false"] .msr-table__row:last-child .msr-table__actions {
  padding-top: 5px;
  padding-bottom: 8px;
}

.msr-table__border .msr-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #7f7f7f36;
  padding: 3px;
}

.msr-table__border .msr-table__pagination .msr-table__pagination_number {
  font-size: 0.875rem;
  line-height: 1.188rem;

  color: #7f7f7f;

  padding-left: 13px;
}

.msr-table__border .msr-table__pagination .msr-table__pagination_arrows {
  display: flex;
  align-items: center;
}
</style>