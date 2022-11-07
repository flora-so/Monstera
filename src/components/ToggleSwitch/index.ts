import { App } from "vue";

import ToggleSwitch from "./ToggleSwitch.vue";

ToggleSwitch.install = (Vue: App) => {
  Vue.component(ToggleSwitch.name, ToggleSwitch);
}

export default ToggleSwitch;