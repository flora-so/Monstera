import { App } from "vue";

import MonsetraCheckbox from "./MonsetraCheckbox.vue";

MonsetraCheckbox.install = (Vue: App) => {
  Vue.component(MonsetraCheckbox.name, MonsetraCheckbox);
}

export default MonsetraCheckbox;