<template>
  <table class="msr-table">
    <thead class="msr-table__head">
      <tr class="msr-table__row">
        <th class="msr-table__column" v-for="col in dataframe.columns">{{ col }}</th>
      </tr>
    </thead>

    <tbody class="msr-table__body">
      <tr class="msr-table__row" v-for="row in dataframe.data">
        <td class="msr-table__data" v-for="col in dataframe.columns">
          <slot :name="col" :data="row[col]">{{ row[col] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

import type { DataFrame } from "./index";

export default defineComponent({
  name: "DataTable",
  props: {
    dataframe: {
      type: Object as PropType<DataFrame>,
      required: true,
    }
  }
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

.msr-table .msr-table__body .msr-table__row:hover {
  background-color: #7f7f7f21;
}

.msr-table .msr-table__body .msr-table__row .msr-table__data {
  padding: 10px 16px;
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