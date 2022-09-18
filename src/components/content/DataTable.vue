<template>
  <table class="msr-table" :full-width="fullWidth">
    <thead class="msr-table__head">
      <tr class="msr-table__row">
        <th v-if="checkbox" class="msr-table__column msr-table__column_checkbox">
          <div class="msr-table__checkbox">
            <monsetra-checkbox ref="checkbox" :colour="colour" :intermediate="_intermediate" v-model="_allChecked">
            </monsetra-checkbox>
          </div>
        </th>
        <th class="msr-table__column" v-for="(col, index) of _colName" :key="index" :focus-col="focusCol == index">
          {{ col }}</th>
        <th v-if="!!actions" class="msr-table__column"></th>
      </tr>
    </thead>

    <tbody class="msr-table__body">
      <tr class="msr-table__row" :row-check="rowCheck" v-for="row in dataframe.data" :key="row.id">
        <td v-if="checkbox" class="msr-table__data" :row-check="rowCheck">
          <div class="msr-table__checkbox">
            <monsetra-checkbox :colour="colour" :value="row.id" v-model="selected"></monsetra-checkbox>
          </div>
        </td>
        <td class="msr-table__data" v-for="col in dataframe.columns" :key="col" @click="_rowSelected(row)">
          <slot :name="col" :data="row[col]" :row="row">{{ row[col] }}</slot>
        </td>
        <td v-if="!!actions" class="msr-table__actions">
          <slot name="actions" :row="row">
            <dropdown-list :items="_actions" :alignment="dropdownAlignment.right"
              @change="(value: string) => _handleAction(value, row)">
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
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import MonsetraCheckbox from "../input/MonsetraCheckbox.vue";
import DropdownList from "../input/DropdownList.vue";
import IconButton from "../button/IconButton.vue";
import { type DataFrame, type ActionItem, type DropdownItem, Colours, DropdownAlignment, Theme, InjectedKeys } from "../../types";

export default defineComponent({
  name: "DataTable",
  components: {
    MonsetraCheckbox,
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
    focusCol: {
      type: Number,
      default: 0,
    },
    modelValue: Array,
    actions: Array as PropType<ActionItem[]>,
    checkbox: Boolean,
    rowCheck: Boolean,
    fullWidth: Boolean,
  },
  data() {
    return {
      _selected: [] as string[],
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
        return this.selected.length == this.dataframe.length;
      },
      set(value: boolean) {
        if (value) {
          this.selected = this.dataframe.id;
        } else {
          this.selected = [];
        }
      }
    },
    _colName() {
      return this.dataframe.columns.map((col) => {
        return col.replace(/([^\p{L}\d]+|(?<=\p{L})(?=\d)|(?<=\d)(?=\p{L})|(?<=[\p{Ll}\d])(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=[\p{L}\d])(?=\p{Lu}\p{Ll}))/gu, ' ');
      });
    },
    _intermediate() {
      return Object.keys(this.selected).length > 0;
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
    _handleAction(value: string, data: object) {
      this.actions!.forEach(item => {
        if (item.label === value) {
          return item.method(data);
        }
      });
    }
  },
});
</script>

<style scoped>
.msr-table {
  border-style: hidden;
  box-shadow: 0px 0px 0px 1px #7f7f7f36;
  border-radius: 8px;

  white-space: nowrap;
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
  padding: 13px 16px;
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

.msr-table .msr-table__body .msr-table__row .msr-table__data {
  padding: 10px 16px;
}

.msr-table .msr-table__body .msr-table__row:last-child .msr-table__data:first-child {
  border-bottom-left-radius: 8px;
}

.msr-table .msr-table__body .msr-table__row:last-child .msr-table__data:last-child,
.msr-table .msr-table__body .msr-table__row:last-child .msr-table__actions {
  border-bottom-right-radius: 8px;
}
</style>