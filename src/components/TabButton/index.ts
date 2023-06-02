import { App } from "vue";

import TabButton from "./TabButton.vue";

TabButton.install = (Vue: App) => {
  Vue.component(TabButton.name, TabButton);
}

export default TabButton;