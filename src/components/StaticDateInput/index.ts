import { App } from "vue";

import StaticDateInput from "./StaticDateInput.vue";

StaticDateInput.install = (Vue: App) => {
  Vue.component(StaticDateInput.name, StaticDateInput);
}

export default StaticDateInput;