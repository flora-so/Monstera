import { App } from "vue";

import OutlinedButton from "./OutlinedButton.vue";

OutlinedButton.install = (Vue: App) => {
  Vue.component(OutlinedButton.name, OutlinedButton);
}

export default OutlinedButton;