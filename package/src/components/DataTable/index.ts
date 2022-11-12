import { App } from "vue";

import DataTable from "./DataTable.vue";

DataTable.install = (Vue: App) => {
  Vue.component(DataTable.name, DataTable);
}

export default DataTable;