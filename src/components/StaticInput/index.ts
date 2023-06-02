import { App } from "vue";

import StaticInput from "./StaticInput.vue";

StaticInput.install = (Vue: App) => {
  Vue.component(StaticInput.name, StaticInput);
}

export default StaticInput;