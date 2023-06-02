import { App } from "vue";

import MonsteraCheckbox from "./MonsteraCheckbox.vue";

MonsteraCheckbox.install = (Vue: App) => {
  Vue.component(MonsteraCheckbox.name, MonsteraCheckbox);
}

export default MonsteraCheckbox;