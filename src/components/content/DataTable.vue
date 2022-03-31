<template>
  <table class="msr-table">
    <thead class="msr-table__head">
      <tr class="msr-table__row">
        <th v-if="checkbox" class="msr-table__column">
          <checkbox
            :colour="colour"
            :intermediate="_intermediate"
            :checked="_allChecked"
            @change="(value) => _checkAll(value)"
          ></checkbox>
        </th>
        <th class="msr-table__column" v-for="col in dataframe.columns">{{ col }}</th>
      </tr>
    </thead>

    <tbody class="msr-table__body">
      <tr
        class="msr-table__row"
        :row-check="rowCheck"
        v-for="(row, index) in dataframe.data"
        @click="_rowSelected(row, index)"
      >
        <td v-if="checkbox" class="msr-table__data" :row-check="rowCheck">
          <checkbox
            :colour="colour"
            :checked="_triggerCheck(index)"
            @change="(value) => _toggleSelected(row, index, value)"
          ></checkbox>
        </td>
        <td class="msr-table__data" v-for="col in dataframe.columns">
          <slot :name="col" :data="row[col]">{{ row[col] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import Checkbox from "../input/Checkbox.vue";
import { type DataFrame, Colours } from "../../types";

export default defineComponent({
  name: "DataTable",
  components: {
    Checkbox,
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
    checkbox: Boolean,
    rowCheck: Boolean,
  },
  data() {
    return {
      _allChecked: false,
      _selected: {} as { [key: number]: object },
    }
  },
  emits: {
    change(dataframe: DataFrame) {
      return typeof dataframe == "object";
    },
    row(row: object) {
      return typeof row == "object";
    },
  },
  computed: {
    _intermediate() {
      return Object.keys(this._selected).length > 0;
    },
    _triggerCheck() {
      return (index: number) => {
        if (this._allChecked) {
          return true;
        } else {
          return this._selected[index] != null;
        }
      }
    }
  },
  methods: {
    _emitChange() {
      let selected = [];
      for (let key in this._selected) {
        selected.push(this._selected[key]);
      }
      this.$emit("change", selected);
    },
    _checkAll(value: boolean) {
      this._allChecked = value;

      if (value) {
        let data = this.dataframe.data;

        for (let i = 0; i < data.length; i++) {
          this._selected[i] = data[i];
        }
      } else {
        this._selected = {};
      }

      this._emitChange();
    },
    _toggleSelected(row: object, index: number, value: boolean) {
      if (value) {
        this._selected[index] = row;

        if (Object.keys(this._selected).length === this.dataframe.data.length) {
          this._allChecked = true;
        }
      } else {
        delete this._selected[index];

        if (this._allChecked) {
          this._allChecked = false;
        }
      }

      this._emitChange();
    },
    _rowSelected(row: object, index: number) {
      this.$emit("row", row);

      if (this.rowCheck) {
        this._toggleSelected(row, index, !this._triggerCheck(index));
      }
    }
  },
});
</script>

<style scoped>
.msr-table {
  border-style: hidden;
  box-shadow: 0px 0px 0px 1px #7f7f7f36;
  border-radius: 8px;
}

.msr-table .msr-table__head .msr-table__row .msr-table__column,
.msr-table .msr-table__body .msr-table__row .msr-table__data {
  font-size: 1rem;
  line-height: 1.313rem;

  border-bottom: 1px solid #7f7f7f36;
}

.msr-table .msr-table__head .msr-table__row .msr-table__column {
  font-weight: 500;
  padding: 13px 16px;
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

.msr-table .msr-table__body .msr-table__row .msr-table__data {
  padding: 10px 16px;
}

.msr-table
  .msr-table__body
  .msr-table__row
  .msr-table__data[row-check="true"]
  > * {
  pointer-events: none;
}

.msr-table
  .msr-table__body
  .msr-table__row:last-child
  .msr-table__data:first-child {
  border-bottom-left-radius: 8px;
}

.msr-table
  .msr-table__body
  .msr-table__row:last-child
  .msr-table__data:last-child {
  border-bottom-right-radius: 8px;
}
</style>