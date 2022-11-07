import { App } from "vue";

import MonsetraDialog from "./MonsetraDialog.vue";

MonsetraDialog.install = (Vue: App) => {
  Vue.component(MonsetraDialog.name, MonsetraDialog);
}

export default MonsetraDialog;