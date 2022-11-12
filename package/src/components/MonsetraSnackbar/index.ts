import { App } from "vue";

import MonsetraSnackbar from "./MonsetraSnackbar.vue";

MonsetraSnackbar.install = (Vue: App) => {
  Vue.component(MonsetraSnackbar.name, MonsetraSnackbar);
}

export default MonsetraSnackbar;