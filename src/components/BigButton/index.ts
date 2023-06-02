import { App } from "vue";

import BigButton from "./BigButton.vue";

BigButton.install = (Vue: App) => {
  Vue.component(BigButton.name, BigButton);
}

export default BigButton;