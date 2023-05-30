import { App } from "vue";

import MonsteraSnackbar from "./MonsteraSnackbar.vue";

MonsteraSnackbar.install = (Vue: App) => {
  Vue.component(MonsteraSnackbar.name, MonsteraSnackbar);
}

export default MonsteraSnackbar;