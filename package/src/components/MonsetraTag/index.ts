import { App } from "vue";

import MonsetraTag from "./MonsetraTag.vue";

MonsetraTag.install = (Vue: App) => {
  Vue.component(MonsetraTag.name, MonsetraTag);
}

export default MonsetraTag;