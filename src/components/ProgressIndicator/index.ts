import { App } from "vue";

import ProgressIndicator from "./ProgressIndicator.vue";

ProgressIndicator.install = (Vue: App) => {
  Vue.component(ProgressIndicator.name, ProgressIndicator);
}

export default ProgressIndicator;