import { App } from "vue";

import StaticTextarea from "./StaticTextarea.vue";

StaticTextarea.install = (Vue: App) => {
  Vue.component(StaticTextarea.name, StaticTextarea);
}

export default StaticTextarea;