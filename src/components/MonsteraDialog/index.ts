import { App } from "vue";

import MonsteraDialog from "./MonsteraDialog.vue";

MonsteraDialog.install = (Vue: App) => {
  Vue.component(MonsteraDialog.name, MonsteraDialog);
}

export default MonsteraDialog;