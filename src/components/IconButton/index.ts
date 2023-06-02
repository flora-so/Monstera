import { App } from "vue";

import IconButton from "./IconButton.vue";

IconButton.install = (Vue: App) => {
  Vue.component(IconButton.name, IconButton);
}

export default IconButton;