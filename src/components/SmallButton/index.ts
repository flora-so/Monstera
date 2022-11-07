import { App } from "vue";

import SmallButton from "./SmallButton.vue";

SmallButton.install = (Vue: App) => {
  Vue.component(SmallButton.name, SmallButton);
}

export default SmallButton;