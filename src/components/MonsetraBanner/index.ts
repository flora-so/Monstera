import { App } from "vue";

import MonsetraBanner from "./MonsetraBanner.vue";

MonsetraBanner.install = (Vue: App) => {
  Vue.component(MonsetraBanner.name, MonsetraBanner);
}

export default MonsetraBanner;