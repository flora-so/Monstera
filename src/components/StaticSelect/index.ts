import { App } from "vue";

import StaticSelect from "./StaticSelect.vue";

StaticSelect.install = (Vue: App) => {
  Vue.component(StaticSelect.name, StaticSelect);
}

export default StaticSelect;