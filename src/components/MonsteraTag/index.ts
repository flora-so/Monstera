import { App } from "vue";

import MonsteraTag from "./MonsteraTag.vue";

MonsteraTag.install = (Vue: App) => {
  Vue.component(MonsteraTag.name, MonsteraTag);
}

export default MonsteraTag;