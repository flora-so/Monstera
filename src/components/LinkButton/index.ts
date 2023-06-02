import { App } from "vue";

import LinkButton from "./LinkButton.vue";

LinkButton.install = (Vue: App) => {
  Vue.component(LinkButton.name, LinkButton);
}

export default LinkButton;