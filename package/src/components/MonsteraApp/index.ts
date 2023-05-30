import { App } from "vue";

import MonsteraApp from "./MonsteraApp.vue";

MonsteraApp.install = (Vue: App) => {
  Vue.component(MonsteraApp.name, MonsteraApp);
}

export default MonsteraApp;